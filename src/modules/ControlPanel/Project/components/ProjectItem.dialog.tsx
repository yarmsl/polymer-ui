import { memo, useState, useCallback, ChangeEvent, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import { SERVER_URL } from '~/lib/constants';
import { file2optiDataurl, file2optiFile } from '~/lib/imageOptimaze';
import { useAppDispatch } from '~/store';
import { closeModalAction } from '~/store/ModalStack';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';
import { useGetAllTagsQuery } from '~/modules/ControlPanel/Tag/store';
import ImagesPreview from '~/UI/atoms/ImagesPreview';

import { useGetAllCustomersQuery } from '../../Customer/store';
import { useEditProjectMutation } from '../store';

export type projEditTypes =
  | 'title'
  | 'tags'
  | 'slug'
  | 'done'
  | 'year'
  | 'customer'
  | 'addImgs'
  | 'editImgs'
  | 'order';

interface IProjectDialogProps {
  project: IProjectFull;
  edit: projEditTypes;
}

const ProjectItemDialog = ({ project, edit }: IProjectDialogProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [editProject, { isLoading }] = useEditProjectMutation();
  const { handleSubmit, control } = useForm<ISendProjectData>();
  const { data: tags } = useGetAllTagsQuery('');
  const { data: customers } = useGetAllCustomersQuery('');
  const [sources, serSources] = useState(project.images);
  const [files, setFiles] = useState<File[]>([]);
  const [upLoading, setUpLoading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const fileUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      try {
        setUpLoading(true);
        if (
          inputRef.current != null &&
          inputRef.current.files != null &&
          inputRef.current.files.length > 0
        ) {
          const resBlobs = Array.from(inputRef.current.files)?.map((file) => {
            return file2optiFile(file, 1920, 0.75, 'webp');
          });
          const res = await Promise.all(resBlobs);
          setFiles((p) => p.concat(res));

          const resurl = Array.from(inputRef.current.files)?.map((file) => {
            return file2optiDataurl(file, 160, 0.75, 'webp');
          });
          const res2 = await Promise.all(resurl);
          setPreviews((p) => p.concat(res2));

          e.target.value = '';
        }
        setUpLoading(false);
      } catch (e) {
        setUpLoading(false);
        dispatch(showErrorSnackbar('ошибка загрузки файлов'));
      }
    },
    [dispatch],
  );

  const handleEditCustomer = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      files?.forEach((file) => formData.append('images', file as Blob));
      const sendData =
        edit === 'editImgs'
          ? { id: project._id, data: { images: sources } }
          : edit === 'addImgs'
          ? { id: project._id, data: formData }
          : { id: project._id, data };
      const res = await editProject(sendData).unwrap();
      dispatch(showSuccessSnackbar(`Проект ${res.title} успешно изменён`));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || 'fail'));
    }
  });

  const validObj = () => {
    switch (edit) {
      case 'year':
        return { required: 'Введите год' };
      case 'done':
        return { required: 'Что было сделано по проекту' };
      case 'slug':
        return {
          required: 'Введите url slug',
          pattern: {
            value: /^[a-zA-Zа-яА-Я0-9_-]*$/,
            message: 'URL slug может содержать только буквы, цифры, - и _',
          },
        };
      case 'order':
        return {
          required: 'Введите порядковый номер',
          pattern: {
            value: /^[0-9]*$/,
            message: 'Только цифры',
          },
        };
      default:
        return undefined;
    }
  };

  const removeSource = useCallback((n: number) => {
    serSources((p) => p.filter((src, i) => i !== n));
  }, []);

  const toFirstPlace = useCallback((n: number) => {
    serSources((p) => {
      p = [...p].sort((a, b) => (p.indexOf(a) === n ? -1 : p.indexOf(b) === n ? 1 : 0));
      return JSON.parse(JSON.stringify(p));
    });
  }, []);

  const removeUploaded = useCallback((n: number) => {
    setFiles((p) => p?.filter((fl, i) => i !== n));
    setPreviews((p) => p?.filter((fl, i) => i !== n));
  }, []);

  const toFirstPlaceUploaded = useCallback((n: number) => {
    setFiles((p) => {
      p.sort((a, b) => (p.indexOf(a) === n ? -1 : p.indexOf(b) === n ? 1 : 0));
      return p;
    });
    setPreviews((p) => {
      p.sort((a, b) => (p.indexOf(a) === n ? -1 : p.indexOf(b) === n ? 1 : 0));
      return JSON.parse(JSON.stringify(p));
    });
  }, []);

  return (
    <Container sx={styles.dialog}>
      <Box component='form' sx={styles.form}>
        <Typography>Редактирование Проекта</Typography>

        {(edit === 'title' ||
          edit === 'done' ||
          edit === 'year' ||
          edit === 'slug' ||
          edit === 'order') && (
          <Controller
            control={control}
            defaultValue={project[edit]}
            name={edit}
            rules={validObj()}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                error={!!error}
                helperText={error ? error.message : null}
                label={edit}
                maxRows={12}
                minRows={5}
                multiline={edit === 'done'}
                size='small'
                sx={styles.input}
                type='text'
                value={value}
                fullWidth
                onChange={onChange}
              />
            )}
          />
        )}

        {edit === 'tags' && (
          <Controller
            control={control}
            defaultValue={[]}
            name='tags'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                color={'warning'}
                error={!!error}
                helperText={error ? error.message : null}
                label='Выберите один или несколько тегов'
                size='small'
                sx={styles.input}
                value={value}
                SelectProps={{
                  multiple: true,
                  renderValue: (selected) => {
                    const print = (selected as string[])?.map((id) => {
                      return tags?.find((tag) => tag._id === id)?.name;
                    });
                    return <div>{print?.join(', ')}</div>;
                  },
                  MenuProps: {
                    PaperProps: { style: { maxHeight: 380, marginTop: 5 } },
                  },
                }}
                fullWidth
                select
                onChange={onChange}
              >
                {tags?.map((tag, i) => (
                  <MenuItem key={i} value={tag._id} dense>
                    <Checkbox checked={value?.includes(tag._id)} size='small' />
                    <ListItemText>{tag.name}</ListItemText>
                  </MenuItem>
                )) || <p>wait...</p>}
              </TextField>
            )}
          />
        )}

        {edit === 'customer' && (
          <Controller
            control={control}
            name='customer'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                color={'warning'}
                error={!!error}
                helperText={error ? error.message : null}
                label='Выберите Заказчика проекта'
                size='small'
                sx={styles.input}
                value={value}
                fullWidth
                select
                onChange={onChange}
              >
                <MenuItem value={undefined} dense></MenuItem>
                {customers?.map((customer, i) => (
                  <MenuItem key={i} value={customer._id} dense>
                    <ListItemText>{customer.name}</ListItemText>
                    <ListItemIcon sx={styles.logo}>
                      {<img alt={customer.name} src={`${SERVER_URL}/${customer.logo}`} />}
                    </ListItemIcon>
                  </MenuItem>
                )) || <p>wait...</p>}
              </TextField>
            )}
          />
        )}

        {edit === 'editImgs' && (
          <ImagesPreview firstPlace={toFirstPlace} remove={removeSource} sources={sources} path />
        )}

        {edit === 'addImgs' && (
          <>
            <input
              ref={inputRef}
              accept='image/webp, image/jpg, image/jpeg, image/png'
              style={{ display: 'none' }}
              type='file'
              multiple
              onChange={fileUpload}
            />
            <ImagesPreview
              firstPlace={toFirstPlaceUploaded}
              remove={removeUploaded}
              sources={previews}
            />
            <Button
              color='success'
              startIcon={upLoading && <CircularProgress color='inherit' size={20} />}
              variant='outlined'
              onClick={() => inputRef.current?.click()}
            >
              Выбрать изображения
            </Button>
          </>
        )}

        <Box sx={styles.actions}>
          <Button
            color='success'
            disabled={isLoading}
            variant='contained'
            endIcon={
              isLoading ? <CircularProgress color='inherit' size={20} /> : <SaveRoundedIcon />
            }
            onClick={handleEditCustomer}
          >
            Сохранить
          </Button>
          <Button variant='contained' onClick={() => dispatch(closeModalAction())}>
            Закрыть
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

const styles: TStyles = {
  actions: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  dialog: {
    padding: '24px',
  },
  form: {
    width: { sm: '300px', md: '600px' },
    '&>*:not(:last-child)': {
      mb: '12px',
    },
  },
  input: {
    minHeight: '60px',
  },
  logo: {
    width: '60px',
    '& img': {
      width: '100%',
      objectFit: 'contain',
    },
  },
};

export default memo(ProjectItemDialog);
