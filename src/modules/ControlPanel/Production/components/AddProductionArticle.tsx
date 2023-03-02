import { Controller, useForm } from 'react-hook-form';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';

import { useAppDispatch } from '~/store';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';

import { useAddProductionArticleMutation } from '../store';

const AddProductionArticle = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { handleSubmit, control, reset } = useForm<IAddProductionArticle>({
    defaultValues: {
      title: '',
      content: '',
      order: '' as unknown as number,
    },
  });
  const [newProdArticle, { isLoading }] = useAddProductionArticleMutation();

  const handleNewProdArticle = handleSubmit(async (data) => {
    try {
      const res = await newProdArticle(data).unwrap();
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
          Новая статья на странице Производство
        </Typography>
        <Typography align='justify' sx={{ mb: '12px' }} variant='subtitle2'>
          Внимание! Отправив Заголовок без статьи вы создадите Заголовок первого уровня на странице
          Производство, он как и любая статься отобразится в соответствии с порядковым номером
        </Typography>

        <Controller
          control={control}
          name='title'
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
          rules={{
            required: 'Введите заголовок статьи',
          }}
        />

        <Controller
          control={control}
          name='content'
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
              label='Порядковый номер статьи'
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

        <Button
          color='success'
          disabled={isLoading}
          endIcon={isLoading ? <CircularProgress color='inherit' size={20} /> : <AddRoundedIcon />}
          variant='contained'
          onClick={handleNewProdArticle}
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
  field: {
    minHeight: '120px',
  },
};

export default AddProductionArticle;
