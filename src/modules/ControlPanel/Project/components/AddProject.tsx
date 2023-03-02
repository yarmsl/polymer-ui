import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
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
import { file2optiFile, file2optiDataurl } from '~/lib/imageOptimaze';
import { useGetAllTagsQuery } from '~/modules/ControlPanel/Tag/store';
import { useAppDispatch } from '~/store';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';
import ImagesPreview from '~/UI/atoms/ImagesPreview';

import { useGetAllCustomersQuery } from '../../Customer/store';
import { useAddProjectMutation } from '../store';

const AddProject = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<File[]>([]);
  const [upLoading, setUpLoading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const { handleSubmit, control, reset, setValue } = useForm<IProject>({
    defaultValues: {
      title: '',
      done: '',
      year: '' as unknown as number,
      slug: '',
      images: [],
      tags: [],
      customer: '',
      order: '' as unknown as number,
    },
  });
  const [newProject, { isLoading }] = useAddProjectMutation();
  const { data: customers } = useGetAllCustomersQuery('');
  const { data: tags } = useGetAllTagsQuery('');

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

  useEffect(() => {
    if (files.length > 0) {
      setValue('images', ['file']);
    } else {
      setValue('images', []);
    }
  }, [files, setValue]);

  const handleNewCustomer = handleSubmit(async (data) => {
    try {
      const sendData = new FormData();
      files?.forEach((file) => sendData.append('images', file as Blob));
      sendData.append('title', data.title);
      sendData.append('done', data.done);
      sendData.append('year', `${data.year}`);
      sendData.append('slug', data.slug);
      sendData.append('order', `${data.order}`);
      if (data.customer) {
        sendData.append('customer', data.customer);
      }
      if (data.tags.length > 0) {
        data.tags.forEach((tag) => sendData.append('tags', tag));
      }
      const res = await newProject(sendData).unwrap();
      dispatch(showSuccessSnackbar(`Проект ${res.title} успешно создан`));
      setFiles([]);
      setPreviews([]);
      reset();
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || 'failed to add project'));
    }
  });

  const remove = useCallback((n: number) => {
    setFiles((p) => p?.filter((fl, i) => i !== n));
    setPreviews((p) => p?.filter((fl, i) => i !== n));
  }, []);

  const toFirstPlace = useCallback((n: number) => {
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
    <Container maxWidth={'xs'}>
      <Box component='form' sx={styles.form}>
        <Typography sx={{ mb: '12px' }} variant='h6'>
          Добавление нового Проекта
        </Typography>
        <input
          ref={inputRef}
          accept='image/webp, image/jpg, image/jpeg, image/png'
          style={{ display: 'none' }}
          type='file'
          multiple
          onChange={fileUpload}
        />
        <ImagesPreview firstPlace={toFirstPlace} remove={remove} sources={previews} />
        <Controller
          control={control}
          name='images'
          render={({ fieldState: { error } }) => (
            <Typography sx={styles.error}>{error?.message}</Typography>
          )}
          rules={{
            required: 'Загрузите фото',
            validate: (val) => (val.length > 0 ? undefined : 'Загрузите фото'),
          }}
        />
        <Button
          color='success'
          startIcon={upLoading && <CircularProgress color='inherit' size={20} />}
          variant='outlined'
          onClick={() => inputRef.current?.click()}
        >
          Выбрать изображения
        </Button>
        <Controller
          control={control}
          name='title'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              autoComplete='off'
              color={'info'}
              error={!!error}
              helperText={error ? error.message : null}
              label='Проект'
              size='small'
              sx={styles.input}
              type='text'
              value={value}
              fullWidth
              onChange={onChange}
            />
          )}
          rules={{
            required: 'Введите название проекта',
          }}
        />

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

        <Controller
          control={control}
          name='done'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              autoComplete='off'
              color={'info'}
              error={!!error}
              helperText={error ? error.message : null}
              label='Что сделано'
              maxRows={3}
              size='small'
              sx={styles.input}
              type='text'
              value={value}
              fullWidth
              multiline
              onChange={onChange}
            />
          )}
          rules={{
            required: 'Что было сделано по проекту',
          }}
        />

        <Controller
          control={control}
          name='year'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              autoComplete='off'
              color={'info'}
              error={!!error}
              helperText={error ? error.message : null}
              label='Год выполнения'
              size='small'
              sx={styles.input}
              type='text'
              value={value}
              fullWidth
              onChange={onChange}
            />
          )}
          rules={{
            required: 'Введите год',
            pattern: {
              value: /^[0-9]*$/,
              message: 'Только цифры',
            },
          }}
        />
        <Controller
          control={control}
          name='order'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              autoComplete='off'
              color={'info'}
              error={!!error}
              helperText={error ? error.message : null}
              label='Порядковый номер Проекта'
              size='small'
              sx={styles.input}
              type='text'
              value={value}
              fullWidth
              onChange={onChange}
            />
          )}
          rules={{
            required: 'Введите порядковый номер',
            pattern: {
              value: /^[0-9]*$/,
              message: 'Только цифры',
            },
          }}
        />
        <Controller
          control={control}
          name='slug'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              autoComplete='off'
              color={'info'}
              error={!!error}
              helperText={error ? error.message : null}
              label='URL slug'
              size='small'
              sx={styles.input}
              type='text'
              value={value}
              fullWidth
              onChange={onChange}
            />
          )}
          rules={{
            required: 'Введите url slug',
            pattern: {
              value: /^[a-zA-Zа-яА-Я0-9_-]*$/,
              message: 'URL slug может содержать только буквы, цифры, - и _',
            },
          }}
        />
        <Typography variant='subtitle2'>*URL slug будет отображаться в строке браузера</Typography>

        <Button
          color='success'
          disabled={isLoading || upLoading}
          endIcon={isLoading ? <CircularProgress color='inherit' size={20} /> : <AddRoundedIcon />}
          variant='contained'
          onClick={handleNewCustomer}
        >
          Добавить
        </Button>
      </Box>
    </Container>
  );
};

const styles: TStyles = {
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '&>*': {
      mb: '6px!important',
    },
  },
  error: {
    width: '100%',
    height: '18px',
    pl: '14px',
    fontSize: '12px',
    color: 'error.main',
  },
  input: {
    minHeight: '68px',
  },
  field: {
    height: '108px',
  },
  logo: {
    width: '60px',
    '& img': {
      width: '100%',
      objectFit: 'contain',
    },
  },
};

export default AddProject;
