import { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import { useAppDispatch } from '~/store';
import { closeModalAction } from '~/store/ModalStack';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';

import { useEditUserByIdMutation } from '../store';

interface IUserItemDialogProps {
  user: IUserResponse;
}

const UserItemDialog = ({ user }: IUserItemDialogProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [editUser, { isLoading: editLoading }] = useEditUserByIdMutation();
  const { handleSubmit, control } = useForm<IEditUser>();
  const handleEditUser = handleSubmit(async (data) => {
    try {
      const sendData = { id: user.id, ...data };
      const res = await editUser(sendData).unwrap();
      dispatch(showSuccessSnackbar(res.message || 'success'));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || 'fail'));
    }
  });
  return (
    <Container maxWidth={'xs'} sx={styles.dialog}>
      <Typography>Редактирование пользователя</Typography>
      <Typography color='teal' variant='h6'>
        {user.email}
      </Typography>
      <Box component='form' sx={styles.form}>
        <Controller
          control={control}
          defaultValue={user.name}
          name='name'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
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
          defaultValue={user.role}
          name='role'
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              error={!!error}
              helperText={error ? error.message : null}
              label='Уровень доступа'
              size='small'
              sx={styles.input}
              value={value}
              fullWidth
              select
              onChange={onChange}
            >
              <MenuItem value='admin'>admin</MenuItem>
              <MenuItem value='user'>user</MenuItem>
            </TextField>
          )}
          rules={{
            required: 'Выберите уровень доступа',
          }}
        />
        <Typography variant='subtitle2'>
          * уровень доступа admin позволяет добавлять, редактировать и удалять пользователей
        </Typography>
        <Box sx={styles.actions}>
          <Button
            color='success'
            disabled={editLoading}
            variant='contained'
            endIcon={
              editLoading ? <CircularProgress color='inherit' size={20} /> : <SaveRoundedIcon />
            }
            onClick={handleEditUser}
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
    mt: '8px',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  dialog: {
    width: '100%',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '&>*:not(:last-child)': {
      mb: '15px',
    },
  },
  form: {
    '&>*:not(:last-child)': {
      mr: '15px',
    },
  },
  input: {
    height: '68px',
  },
};

export default memo(UserItemDialog);
