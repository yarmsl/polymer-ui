import { Controller, useForm } from 'react-hook-form';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';

import { useAppDispatch } from '~/store';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';

import { useAddVacancyMutation } from '../store';

const AddVacancy = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { handleSubmit, control, reset } = useForm<IAddVacancy>({
    defaultValues: {
      title: '',
      requirements: '',
      wage: '' as unknown as number,
    },
  });
  const [newVacancy, { isLoading }] = useAddVacancyMutation();

  const handleNewVacancy = handleSubmit(async (data) => {
    try {
      const res = await newVacancy(data).unwrap();
      dispatch(showSuccessSnackbar(`Вакансия ${res.title} сохранена`));
      reset();
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || 'fail'));
    }
  });

  return (
    <Container maxWidth={'xs'}>
      <Box component='form' sx={styles.form}>
        <Typography align='center' sx={{ mb: '12px' }} variant='h6'>
          Новая История на странице О компании
        </Typography>

        <Controller
          control={control}
          name='title'
          rules={{ required: 'Введите вакансию' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              autoComplete='off'
              color={'info'}
              error={!!error}
              helperText={error ? error.message : null}
              label='Вакансия'
              size='small'
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
          name='requirements'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              autoComplete='off'
              color={'info'}
              error={!!error}
              helperText={error ? error.message : null}
              label='Требования'
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
            required: 'Введите Требования',
          }}
        />

        <Controller
          control={control}
          name='wage'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              autoComplete='off'
              color={'info'}
              error={!!error}
              helperText={error ? error.message : null}
              label='Заработная плата от (руб)'
              size='small'
              sx={styles.input}
              type='text'
              value={value}
              fullWidth
              onChange={onChange}
            />
          )}
          rules={{
            required: 'Введите заработную плату',
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
          onClick={handleNewVacancy}
        >
          Сохранить
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
  input: {
    minHeight: '68px',
    mt: '16px',
  },
};

export default AddVacancy;
