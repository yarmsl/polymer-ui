import { useForm, Controller } from 'react-hook-form';

import {
  Box,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import { useAppDispatch } from '~/store';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';

import { useAddMailsMutation } from '../store';

const AddMail = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [addMailaddrss, { isLoading }] = useAddMailsMutation();
  const { control, handleSubmit, reset } = useForm<IAddMails>({
    defaultValues: {
      email: '',
      pass: '',
      provider: 'Mail.ru',
      feedback: '',
    },
  });

  const handleAddMails = handleSubmit(async (data) => {
    try {
      const res = await addMailaddrss(data).unwrap();
      dispatch(showSuccessSnackbar(res.message || 'Почтовые адреса добавлены'));
      reset();
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || 'fail'));
    }
  });

  return (
    <Container maxWidth={'xs'} sx={styles.wrapper}>
      <Box component='form' sx={styles.root}>
        <Typography variant='h6' gutterBottom>
          Добавление почтовых адресов
        </Typography>
        <Typography align='justify' variant='subtitle2' gutterBottom>
          Для настройки почты для рассылки доступны сервисы Yandex, Mail.ru или Yahoo, возможно
          потребуются дополнительные настройки почтового ящика. Ссылка на настройки придет в
          уведомлении об ошибке. Почта для обратной связи может быть любой.
        </Typography>
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              autoComplete='off'
              color={'warning'}
              error={!!error}
              helperText={error ? error.message : null}
              label='Почта (yahoo, yandex или mail.ru)'
              size='small'
              sx={styles.input}
              type='text'
              value={value}
              fullWidth
              onChange={onChange}
            />
          )}
          rules={{
            required: 'Введите почту',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Введите корректный email',
            },
          }}
        />
        <Controller
          control={control}
          name='provider'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              error={!!error}
              helperText={error ? error.message : null}
              label='Выберите сервис'
              size='small'
              sx={styles.input}
              value={value}
              fullWidth
              select
              onChange={onChange}
            >
              {['Yahoo', 'Yandex', 'Mail.ru'].map((ser) => (
                <MenuItem key={ser} value={ser}>
                  {ser}
                </MenuItem>
              ))}
            </TextField>
          )}
          rules={{
            required: 'Выберите сервис',
          }}
        />
        <Controller
          control={control}
          name='pass'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              autoComplete='off'
              error={!!error}
              helperText={error ? error.message : null}
              label='Пароль от неё'
              size='small'
              sx={styles.input}
              type='password'
              value={value}
              fullWidth
              onChange={onChange}
            />
          )}
          rules={{
            required: 'Введите пароль',
          }}
        />
        <Controller
          control={control}
          name='feedback'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              autoComplete='off'
              color={'warning'}
              error={!!error}
              helperText={error ? error.message : null}
              label='Почта, для обратной связи'
              size='small'
              sx={styles.input}
              type='text'
              value={value}
              fullWidth
              onChange={onChange}
            />
          )}
          rules={{
            required: 'Введите почту для обратной связи',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Введите корректный email',
            },
          }}
        />
        <Button
          color='info'
          startIcon={isLoading && <CircularProgress color='inherit' size={20} />}
          variant='contained'
          onClick={handleAddMails}
        >
          Сохранить
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
  },
  input: {
    height: '60px',
    mt: '12px',
  },
};

export default AddMail;
