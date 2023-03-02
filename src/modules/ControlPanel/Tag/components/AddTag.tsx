import { Controller, useForm } from 'react-hook-form';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';

import { useAppDispatch } from '~/store';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';

import { useAddTagMutation } from '../store';

const AddTag = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { handleSubmit, control, reset } = useForm<IAddTag>({
    defaultValues: { name: '', slug: '', order: '' as unknown as number },
  });
  const [newTag, { isLoading }] = useAddTagMutation();

  const handleNewTag = handleSubmit(async (data) => {
    try {
      const res = await newTag(data).unwrap();
      dispatch(showSuccessSnackbar(`Тег ${res.name} успешно создан`));
      reset();
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || 'failed to add user'));
    }
  });
  return (
    <Container maxWidth={'xs'}>
      <Box component='form' sx={styles.form}>
        <Typography sx={{ mb: '12px' }} variant='h6'>
          Добавление нового тега
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
              label='Тег'
              size='small'
              sx={styles.input}
              type='text'
              value={value}
              fullWidth
              onChange={onChange}
            />
          )}
          rules={{
            required: 'Введите название тега',
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
        <Controller
          control={control}
          name='order'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              autoComplete='off'
              color={'info'}
              error={!!error}
              helperText={error ? error.message : null}
              label='Порядковый номер тега'
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
        <Typography variant='subtitle2'>*URL slug будет отображаться в строке браузера</Typography>
        <Button
          color='success'
          disabled={isLoading}
          endIcon={isLoading ? <CircularProgress color='inherit' size={20} /> : <AddRoundedIcon />}
          variant='contained'
          onClick={handleNewTag}
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
      mb: '8px',
    },
  },
  input: {
    height: '68px',
  },
};

export default AddTag;
