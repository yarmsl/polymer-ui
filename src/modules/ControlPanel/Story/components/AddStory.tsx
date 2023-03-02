import { Controller, useForm } from 'react-hook-form';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';

import { useAppDispatch } from '~/store';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';

import { useAddStoryMutation } from '../store';

const AddStory = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { handleSubmit, control, reset } = useForm<IAddStory>({
    defaultValues: {
      content: '',
      from: '' as unknown as number,
      to: '' as unknown as number,
    },
  });
  const [newStory, { isLoading }] = useAddStoryMutation();

  const handleNewStory = handleSubmit(async (data) => {
    try {
      const res = await newStory(data).unwrap();
      dispatch(showSuccessSnackbar(`История ${res.from} сохранена`));
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
          name='content'
          rules={{ required: 'Напишите историю' }}
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
              sx={styles.input}
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
          name='from'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              autoComplete='off'
              color={'info'}
              error={!!error}
              helperText={error ? error.message : null}
              label='Год (с какого года)'
              size='small'
              sx={styles.input}
              type='text'
              value={value}
              fullWidth
              onChange={onChange}
            />
          )}
          rules={{
            required: 'Введите год',
            pattern: {
              value: /^[0-9]*$/,
              message: 'Только цифры',
            },
          }}
        />

        <Controller
          control={control}
          name='to'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              autoComplete='off'
              color={'info'}
              error={!!error}
              helperText={error ? error.message : null}
              label='По какой год *(НЕобязательно)'
              size='small'
              sx={styles.input}
              type='text'
              value={value}
              fullWidth
              onChange={onChange}
            />
          )}
          rules={{
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
          onClick={handleNewStory}
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

export default AddStory;
