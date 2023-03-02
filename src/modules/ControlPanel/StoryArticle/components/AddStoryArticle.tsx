import { Controller, useForm } from 'react-hook-form';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';

import { useAppDispatch } from '~/store';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';

import { useAddStoryArticleMutation } from '../store';

const AddStoryArticle = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { handleSubmit, control, reset } = useForm<IAddStoryArticle>({
    defaultValues: {
      title: '',
      content: '',
    },
  });
  const [newStoryArticle, { isLoading }] = useAddStoryArticleMutation();

  const handleNewStory = handleSubmit(async (data) => {
    try {
      const res = await newStoryArticle(data).unwrap();
      dispatch(showSuccessSnackbar(`Статья ${res.title} опубликована`));
      reset();
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || 'fail'));
    }
  });

  return (
    <Container maxWidth={'xs'}>
      <Box component='form' sx={styles.form}>
        <Typography align='center' sx={{ mb: '12px' }} variant='h6'>
          Новая статья на странице О компании
        </Typography>

        <Controller
          control={control}
          name='title'
          rules={{ required: 'Введите заголовок' }}
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
        />

        <Controller
          control={control}
          name='content'
          rules={{ required: 'Напишите статью' }}
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

        <Button
          color='success'
          disabled={isLoading}
          endIcon={isLoading ? <CircularProgress color='inherit' size={20} /> : <AddRoundedIcon />}
          sx={{ mt: '16px' }}
          variant='contained'
          onClick={handleNewStory}
        >
          Опубликовать
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

export default AddStoryArticle;
