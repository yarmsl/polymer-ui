import { Controller, useForm } from 'react-hook-form';

import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';

import { useFeedbackMutation } from '~/modules/ControlPanel/Mail/store';
import { useAppDispatch } from '~/store';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';

const FeedbackForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [sendFeedback, { isLoading }] = useFeedbackMutation();
  const { control, handleSubmit, reset } = useForm<Ifeedback>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const handleFeedback = handleSubmit(async (data) => {
    try {
      console.log(data);
      const res = await sendFeedback(data).unwrap();
      dispatch(showSuccessSnackbar(res?.message || 'Мы свяжемся с вами'));
      reset();
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || 'Поробуйте в другой раз'));
    }
  });

  return (
    <Box component='form' sx={styles.root}>
      <Typography align='center' color='white' component='p' variant='h5'>
        Заполните форму и мы свяжемся с вами!
      </Typography>
      <Controller
        control={control}
        name='name'
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            autoComplete='off'
            color='secondary'
            error={!!error}
            helperText={error ? error.message : null}
            placeholder='Как к вам обращаться?'
            sx={styles.input}
            type='text'
            value={value}
            fullWidth
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name='email'
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            autoComplete='off'
            color='secondary'
            error={!!error}
            helperText={error ? error.message : null}
            placeholder='Электронная почта (обязательно)'
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
        name='phone'
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            autoComplete='off'
            color='secondary'
            error={!!error}
            helperText={error ? error.message : null}
            placeholder='Номер телефона (обязательно)'
            sx={styles.input}
            type='tel'
            value={value}
            fullWidth
            onChange={onChange}
          />
        )}
        rules={{
          required: 'Введите номер',
          pattern: {
            value: /^[0-9+()_-]*$/,
            message: 'Введите правильный номер',
          },
          minLength: {
            value: 7,
            message: 'Введите правильный номер',
          },
        }}
      />
      <Button
        color='primary'
        size='large'
        startIcon={isLoading && <CircularProgress color='inherit' size={20} />}
        variant='contained'
        onClick={handleFeedback}
      >
        Отправить
      </Button>
      <Typography align='center' color='white' variant='subtitle2'>
        Нажимая на кнопку, вы даете согласие на обработку персональных данных и соглашаетесь с
        политикой конфиденциальности
      </Typography>
    </Box>
  );
};

const styles: TStyles = {
  root: {
    width: '100%',
    maxWidth: '480px',
    minWidth: '320px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '&>*:not(:last-child)': { mb: '12px' },
  },
  input: {
    height: '65px',
    '& input': {
      background: '#fff',
      borderRadius: '5px',
    },
    '& .MuiFormHelperText-root.Mui-error': {
      color: '#fff',
    },
  },
};

export default FeedbackForm;
