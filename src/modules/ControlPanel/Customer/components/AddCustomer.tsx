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

import { file2img } from '~/lib/imageOptimaze';
import { useAppDispatch } from '~/store';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';

import { useAddCustomerMutation } from '../store';

const AddCustomer = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [upLoading, setUpLoading] = useState(false);
  const [preview, setPreview] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleSubmit, control, reset, setValue } = useForm<IAddCustomer>({
    defaultValues: {
      name: '',
      slug: '',
      logo: '',
      description: '',
      order: '' as unknown as number,
    },
  });
  const [newCustomer, { isLoading }] = useAddCustomerMutation();

  const fileUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      try {
        setUpLoading(true);
        if (
          inputRef.current != null &&
          inputRef.current.files != null &&
          inputRef.current.files.length > 0
        ) {
          setFile(inputRef.current.files[0]);
          const res = await file2img(inputRef.current.files[0]);
          setPreview(res);
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
      setValue('logo', 'file');
    } else {
      setValue('logo', '');
    }
  }, [file, setValue]);

  const handleNewCustomer = handleSubmit(async (data) => {
    try {
      const sendData = new FormData();
      sendData.append('name', data.name);
      sendData.append('description', data.description);
      sendData.append('slug', data.slug);
      sendData.append('order', `${data.order}`);
      sendData.append('logo', file as Blob);
      const res = await newCustomer(sendData).unwrap();
      dispatch(showSuccessSnackbar(`Заказчик ${res.name} успешно создан`));
      reset();
      setFile(null);
      setPreview('');
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || 'failed to add customer'));
    }
  });

  const clear = useCallback(() => {
    setFile(null);
    setPreview('');
    if (inputRef.current != null) {
      inputRef.current.files = null;
    }
    setValue('logo', '');
  }, [setValue]);

  return (
    <Container maxWidth={'xs'}>
      <Box component='form' sx={styles.form}>
        <Typography sx={{ mb: '12px' }} variant='h6'>
          Добавление нового Заказчика
        </Typography>
        <input
          ref={inputRef}
          accept='image/svg+xml'
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
          {preview && <img alt='Лого' src={preview as unknown as string} />}
        </Paper>
        <Controller
          control={control}
          name='logo'
          render={({ fieldState: { error } }) => (
            <Typography sx={styles.error}>{error?.message}</Typography>
          )}
          rules={{
            required: 'Загрузите лого',
          }}
        />
        <Button
          color='success'
          startIcon={upLoading && <CircularProgress color='inherit' size={20} />}
          variant='outlined'
          onClick={() => inputRef.current?.click()}
        >
          Загрузить лого (*.svg)
        </Button>
        <Controller
          control={control}
          name='name'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              autoComplete='off'
              color={'info'}
              error={!!error}
              helperText={error ? error.message : null}
              label='Заказчик'
              size='small'
              sx={styles.input}
              type='text'
              value={value}
              fullWidth
              onChange={onChange}
            />
          )}
          rules={{
            required: 'Введите наименование Заказчика',
          }}
        />
        <Controller
          control={control}
          name='description'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              autoComplete='off'
              color={'info'}
              error={!!error}
              helperText={error ? error.message : null}
              label='Описание'
              maxRows={3}
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
              label='Порядковый номер Заказчика'
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
  form: {
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
    height: '80px',
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
    height: '68px',
  },
  field: {
    height: '108px',
  },
};

export default AddCustomer;
