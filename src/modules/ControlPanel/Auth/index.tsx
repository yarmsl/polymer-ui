import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Box, Container, TextField, Button, Typography, CircularProgress } from '@mui/material';

import bg from '~/assets/production.webp';
import { useAppDispatch } from '~/store';
import { showErrorSnackbar } from '~/store/Notifications';

import { setAuth, useSignInMutation } from './store';

const Auth: React.FC = () => {
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm<formSignIn>();
  const [signIn, { isLoading: signInLoading }] = useSignInMutation();

  const handleSignIn = handleSubmit(async (data) => {
    try {
      const user = await signIn(data).unwrap();
      dispatch(setAuth(user));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError).data?.message || 'sign in error'));
    }
  });

  return (
    <Container maxWidth={false} sx={styles.wrapper} disableGutters>
      <img alt='bg' src={bg} />
      <Box sx={styles.blackdrop}></Box>
      <Container maxWidth='xs' sx={styles.root}>
        <Typography sx={styles.title} variant='h6'>
          Добро пожаловать в панель управления
        </Typography>
        <Box component='form' sx={styles.form}>
          <Controller
            control={control}
            defaultValue=''
            name='email'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                autoComplete='email'
                color='warning'
                error={!!error}
                helperText={error ? error.message : null}
                label='Email'
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
            defaultValue=''
            name='password'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                autoComplete='current-password'
                error={!!error}
                helperText={error ? error.message : null}
                label='Пароль'
                sx={styles.input}
                type='password'
                value={value}
                fullWidth
                onChange={onChange}
              />
            )}
            rules={{
              required: 'Enter password',
              minLength: {
                value: 6,
                message: 'min password length 6',
              },
            }}
          />
          <Button
            color='primary'
            disabled={signInLoading}
            startIcon={signInLoading && <CircularProgress color='inherit' size={20} />}
            variant='contained'
            onClick={handleSignIn}
          >
            Войти
          </Button>
        </Box>
      </Container>
    </Container>
  );
};

const styles: TStyles = {
  wrapper: {
    flexGrow: 1,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '& img': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
    },
  },
  blackdrop: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  root: {
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: '8px',
    position: 'relative',
  },
  title: {
    mb: '15px',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    '&>*': {
      mb: '15px',
    },
  },
  input: {
    height: '82px',
  },
};

export default React.memo(Auth);
