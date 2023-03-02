import { Controller, useForm } from 'react-hook-form';

import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';

import { useAppDispatch } from '~/store';
import { useSendFileToMailMutation } from '~/modules/ControlPanel/Mail/store';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';

const GetPresentationByEmail = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [sentToMail, { isLoading }] = useSendFileToMailMutation();
  const { control, reset, handleSubmit } = useForm<IWantFile>({
    defaultValues: { email: '' },
  });

  const handleSendMail = handleSubmit(async (data) => {
    try {
      const res = await sentToMail(data).unwrap();
      dispatch(showSuccessSnackbar(res?.message || 'Проверьте вашу почту'));
      reset();
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || 'Поробуйте в другой раз'));
    }
  });

  return (
    <Box component='form' sx={styles.root}>
      <Typography align='center'>Получить презентацию на электронную почту</Typography>
      <Controller
        control={control}
        name='email'
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            autoComplete='off'
            color='secondary'
            error={!!error}
            helperText={error ? error.message : null}
            label='Ваша электронная почта'
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
      <Button
        color='secondary'
        startIcon={isLoading && <CircularProgress color='inherit' size={20} />}
        variant='contained'
        onClick={handleSendMail}
      >
        Получить
      </Button>
    </Box>
  );
};

const styles: TStyles = {
  root: {
    width: '195px',
    display: 'flex',
    flexDirection: 'column',
    '&>*:not(:last-child)': {
      mb: '14px',
    },
  },
  input: {
    height: '50px',
  },
};

export default GetPresentationByEmail;
