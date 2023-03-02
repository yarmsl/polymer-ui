import { useForm, Controller } from 'react-hook-form';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Box, Container, TextField, Button, CircularProgress, Typography } from '@mui/material';

import { useAppDispatch } from '~/store';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';

import { useSignUpMutation } from '../store';

const CreateUser = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { handleSubmit, control, reset } = useForm<formSignUp>({
    defaultValues: { name: '', email: '', password: '' },
  });
  const [signUp, { isLoading: signUpLoading }] = useSignUpMutation();

  const handleSignUp = handleSubmit(async (data) => {
    try {
      const res = await signUp(data).unwrap();
      dispatch(showSuccessSnackbar(res.message || 'user successfully created'));
      reset();
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || 'failed to add user'));
    }
  });

  return (
    <Container maxWidth='xs' sx={styles.root}>
      <Box component='form' sx={styles.form}>
        <Typography sx={{ mb: '12px' }} variant='h6'>
          Создание нового пользователя
        </Typography>
        <Controller
          control={control}
          name='name'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              autoComplete='off'
              color={'info'}
              error={!!error}
              helperText={error ? error.message : null}
              label='Имя'
              size='small'
              sx={styles.input}
              type='text'
              value={value}
              fullWidth
              onChange={onChange}
            />
          )}
          rules={{
            required: 'Введите имя',
          }}
        />
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              autoComplete='off'
              color={'warning'}
              error={!!error}
              helperText={error ? error.message : null}
              label='Email'
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
          name='password'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              autoComplete='name'
              error={!!error}
              helperText={error ? error.message : null}
              label='Пароль'
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
            minLength: {
              value: 6,
              message: 'минимум 6 символов',
            },
          }}
        />
        <Button
          color='success'
          disabled={signUpLoading}
          variant='contained'
          endIcon={
            signUpLoading ? <CircularProgress color='inherit' size={20} /> : <AddRoundedIcon />
          }
          onClick={handleSignUp}
        >
          Создать
        </Button>
      </Box>
    </Container>
  );
};

const styles: TStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    height: '68px',
  },
};

export default CreateUser;
