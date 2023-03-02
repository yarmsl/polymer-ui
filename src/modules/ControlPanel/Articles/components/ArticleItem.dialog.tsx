import { memo, useState, useCallback, ChangeEvent, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';

import { file2optiDataurl, file2optiFile } from '~/lib/imageOptimaze';
import { useAppDispatch } from '~/store';
import { closeModalAction } from '~/store/ModalStack';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';
import ImagesPreview from '~/UI/atoms/ImagesPreview';

import { useEditArticleMutation } from '../store';

export type articleEditTypes = 'title' | 'content' | 'addImgs' | 'editImgs';

interface IArticleDialogProps {
  article: IArticleFull;
  edit: articleEditTypes;
}

const ArticleItemDialog = ({ article, edit }: IArticleDialogProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [editArticle, { isLoading }] = useEditArticleMutation();
  const { handleSubmit, control } = useForm<ISendArticle>();
  const [sources, serSources] = useState(article.images);
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
            return file2optiFile(file, 800, 0.85, 'webp');
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

  const handleEditArticle = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      files?.forEach((file) => formData.append('images', file as Blob));
      const sendData =
        edit === 'editImgs'
          ? { id: article._id, data: { images: sources } }
          : edit === 'addImgs'
          ? { id: article._id, data: formData }
          : { id: article._id, data };
      const res = await editArticle(sendData).unwrap();
      dispatch(showSuccessSnackbar(`Статья ${res.title} успешно изменена`));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || 'fail'));
    }
  });

  const validObj = () => {
    switch (edit) {
      case 'title':
        return { required: 'Введите заголовок статьи' };
      case 'content':
        return { required: 'Напишите статью' };
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
    <Container maxWidth='sm' sx={styles.dialog}>
      <Box component='form' sx={styles.form}>
        <Typography>Редактирование Статьи</Typography>

        {(edit === 'title' || edit === 'content') && (
          <Controller
            control={control}
            defaultValue={article[edit]}
            name={edit}
            rules={validObj()}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                error={!!error}
                helperText={error ? error.message : null}
                label={edit}
                maxRows={12}
                minRows={5}
                multiline={edit === 'content'}
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
            onClick={handleEditArticle}
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
};

export default memo(ArticleItemDialog);
