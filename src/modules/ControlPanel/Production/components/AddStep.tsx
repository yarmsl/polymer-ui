import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  ListItemText,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import { file2optiFile, file2optiDataurl } from '~/lib/imageOptimaze';
import { useAppDispatch } from '~/store';
import { useGetProductionArticlesDataQuery } from '~/store/Data';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';

import { useAddProductionStepMutation } from '../store';

const AddStep = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [upLoading, setUpLoading] = useState(false);
  const [preview, setPreview] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleSubmit, control, reset, setValue } = useForm<IAddStep>({
    defaultValues: {
      title: '',
      content: '',
      image: '',
      order: '' as unknown as number,
      productionArticle: '',
    },
  });

  const { data } = useGetProductionArticlesDataQuery('');
  const articles = useMemo(
    () => (Array.isArray(data) ? data.filter((article) => article.content !== '') : []),
    [data],
  );
  const [newStep, { isLoading }] = useAddProductionStepMutation();

  const fileUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      try {
        setUpLoading(true);
        if (
          inputRef.current != null &&
          inputRef.current.files != null &&
          inputRef.current.files.length > 0
        ) {
          const res = await file2optiFile(inputRef.current.files[0], 800, 0.85, 'webp');
          setFile(res);
          const prRes = await file2optiDataurl(inputRef.current.files[0], 500, 0.75, 'webp');
          setPreview(prRes);
          e.target.value = '';
        }
        setUpLoading(false);
      } catch (e) {
        setUpLoading(false);
        dispatch(showErrorSnackbar('ошибка загрузки файла'));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (file) {
      setValue('image', 'file');
    } else {
      setValue('image', '');
    }
  }, [file, setValue]);

  const handleNewStep = handleSubmit(async (data) => {
    try {
      const sendData = new FormData();
      sendData.append('title', data.title);
      sendData.append('content', data.content);
      sendData.append('order', `${data.order}`);
      sendData.append('productionArticle', data.productionArticle);
      sendData.append('image', file as Blob);
      await newStep(sendData).unwrap();
      dispatch(showSuccessSnackbar(`Статья успешно опубликована`));
      reset();
      setFile(null);
      setPreview('');
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || 'fail'));
    }
  });

  const clear = useCallback(() => {
    setFile(null);
    setPreview('');
    if (inputRef.current != null) {
      inputRef.current.files = null;
    }
    setValue('image', '');
  }, [setValue]);

  return (
    <Container maxWidth={'xs'}>
      <Box component='form' sx={styles.root}>
        <Typography align='center' sx={{ mb: '12px' }} variant='h6'>
          Новая подстаться с изображением
        </Typography>
        <input
          ref={inputRef}
          accept='image/*'
          style={{ display: 'none' }}
          type='file'
          onChange={fileUpload}
        />
        <Paper sx={styles.preview}>
          {file && (
            <IconButton size='small' sx={styles.remove} onClick={clear}>
              <CloseRoundedIcon color='error' fontSize='small' />
            </IconButton>
          )}
          {preview && <img alt='Баннер' src={preview} />}
        </Paper>
        <Controller
          control={control}
          name='image'
          render={({ fieldState: { error } }) => (
            <Typography sx={styles.error}>{error?.message}</Typography>
          )}
          rules={{
            required: 'Загрузите изображение',
          }}
        />
        <Button
          color='success'
          startIcon={upLoading && <CircularProgress color='inherit' size={20} />}
          variant='outlined'
          onClick={() => inputRef.current?.click()}
        >
          Загрузить изображение
        </Button>

        <Controller
          control={control}
          name='productionArticle'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              color={'warning'}
              error={!!error}
              helperText={error ? error.message : null}
              label='Выберите Статью'
              size='small'
              sx={styles.input}
              value={value}
              fullWidth
              select
              onChange={onChange}
            >
              <MenuItem value={undefined} dense></MenuItem>
              {articles?.map((article, i) => (
                <MenuItem key={i} value={article._id} dense>
                  <ListItemText>{article.title}</ListItemText>
                </MenuItem>
              )) || <p>wait...</p>}
            </TextField>
          )}
          rules={{
            required: 'Выберите статью',
          }}
        />

        <Controller
          control={control}
          name='title'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              autoComplete='off'
              color={'info'}
              error={!!error}
              helperText={error ? error.message : null}
              label='Заголовок'
              size='small'
              sx={styles.input}
              type='text'
              value={value}
              fullWidth
              onChange={onChange}
            />
          )}
          rules={{
            required: 'Введите заголовок статьи',
          }}
        />

        <Controller
          control={control}
          name='content'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              autoComplete='off'
              color={'info'}
              error={!!error}
              helperText={error ? error.message : null}
              label='Статья'
              maxRows={8}
              minRows={3}
              size='small'
              sx={styles.field}
              type='text'
              value={value}
              fullWidth
              multiline
              onChange={onChange}
            />
          )}
          rules={{
            required: 'Напишите статью',
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
              label='Порядковый номер статьи'
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

        <Button
          color='success'
          disabled={isLoading}
          endIcon={isLoading ? <CircularProgress color='inherit' size={20} /> : <AddRoundedIcon />}
          sx={{ mt: '16px' }}
          variant='contained'
          onClick={handleNewStep}
        >
          Опубликовать
        </Button>
      </Box>
    </Container>
  );
};

const styles: TStyles = {
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '&>*': {
      mb: '6px!important',
    },
  },
  preview: {
    width: '100%',
    height: '280px',
    position: 'relative',
    '& img': {
      width: '100%',
      height: '100%',
      padding: '8px',
      objectFit: 'contain',
    },
  },
  remove: {
    position: 'absolute',
    top: '2px',
    right: '2px',
  },
  error: {
    width: '100%',
    height: '18px',
    pl: '14px',
    fontSize: '12px',
    color: 'error.main',
  },
  input: {
    mt: '20px',
  },
  field: {
    minHeight: '120px',
  },
};

export default AddStep;
