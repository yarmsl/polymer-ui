import { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';

import { useAppDispatch } from '~/store';
import { closeModalAction } from '~/store/ModalStack';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';

import { useEditTagMutation } from '../store';

interface ITagItemDialogProps {
  tag: ITagFull;
  edit: 'name' | 'slug' | 'order';
}

const TagItemDialog = ({ tag, edit }: ITagItemDialogProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [editTag, { isLoading }] = useEditTagMutation();
  const { handleSubmit, control } = useForm<IEditTagData>();

  const handleEditTag = handleSubmit(async (data) => {
    try {
      const sendData = { id: tag._id, data };
      const res = await editTag(sendData).unwrap();
      dispatch(showSuccessSnackbar(`Тег ${res.name} успешно изменён`));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || 'fail'));
    }
  });
  return (
    <Container sx={styles.dialog}>
      <Box component='form' sx={styles.form}>
        <Typography>Редактирование тега</Typography>
        {edit === 'name' && (
          <Controller
            control={control}
            defaultValue={tag.name}
            name='name'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
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
        )}
        {edit === 'slug' && (
          <Controller
            control={control}
            defaultValue={tag.slug}
            name='slug'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                error={!!error}
                helperText={error ? error.message : null}
                label='URL slug'
                size='small'
                sx={styles.input}
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
        )}

        {edit === 'order' && (
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
        )}

        <Box sx={styles.actions}>
          <Button
            color='success'
            disabled={isLoading}
            variant='contained'
            endIcon={
              isLoading ? <CircularProgress color='inherit' size={20} /> : <SaveRoundedIcon />
            }
            onClick={handleEditTag}
          >
            Сохранить
          </Button>
          <Button variant='contained' onClick={() => dispatch(closeModalAction())}>
            Закрыть
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

const styles: TStyles = {
  actions: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  dialog: {
    padding: '24px',
  },
  form: {
    width: '300px',
    '&>*:not(:last-child)': {
      mb: '12px',
    },
  },
  input: {
    height: '60px',
  },
};

export default memo(TagItemDialog);
