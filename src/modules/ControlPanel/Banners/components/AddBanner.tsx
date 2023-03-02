import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import { file2optiFile, file2optiDataurl } from '~/lib/imageOptimaze';
import { useAppDispatch } from '~/store';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';

import { useAddBannerMutation } from '../store';

const AddBanner = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [upLoading, setUpLoading] = useState(false);
  const [preview, setPreview] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleSubmit, control, reset, setValue } = useForm<IAddBanner>({
    defaultValues: { text: '', image: '', order: '' as unknown as number },
  });
  const [newBanner, { isLoading }] = useAddBannerMutation();

  const fileUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      try {
        setUpLoading(true);
        if (
          inputRef.current != null &&
          inputRef.current.files != null &&
          inputRef.current.files.length > 0
        ) {
          const res = await file2optiFile(inputRef.current.files[0], 1920, 0.75, 'webp');
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

  const handleNewCustomer = handleSubmit(async (data) => {
    try {
      const sendData = new FormData();
      sendData.append('text', data.text);
      sendData.append('image', file as Blob);
      await newBanner(sendData).unwrap();
      dispatch(showSuccessSnackbar(`баннер успешно создан`));
      reset();
      setFile(null);
      setPreview('');
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || 'failed to add banner'));
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
        <Typography sx={{ mb: '12px' }} variant='h6'>
          Добавление нового Баннера
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
          name='text'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              autoComplete='off'
              color={'info'}
              error={!!error}
              helperText={error ? error.message : null}
              label='Содержание слайда'
              maxRows={8}
              minRows={3}
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
            required: 'Введите Текст для слайда',
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
              label='Порядковый номер баннера'
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
};

export default AddBanner;
