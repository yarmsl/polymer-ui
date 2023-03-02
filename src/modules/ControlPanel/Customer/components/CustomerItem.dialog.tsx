import { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';

import { useAppDispatch } from '~/store';
import { closeModalAction } from '~/store/ModalStack';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';

import { useEditCustomerMutation } from '../store';

interface ITagItemDialogProps {
  customer: ICustomerFull;
  edit: 'name' | 'slug' | 'description' | 'order';
}

const CustomerItemDialog = ({ customer, edit }: ITagItemDialogProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [editCustomer, { isLoading }] = useEditCustomerMutation();
  const { handleSubmit, control } = useForm<IEditCustomerData>();

  const handleEditCustomer = handleSubmit(async (data) => {
    try {
      const sendData = { id: customer._id, data };
      const res = await editCustomer(sendData).unwrap();
      dispatch(showSuccessSnackbar(`Заказчик ${res.name} успешно изменён`));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || 'fail'));
    }
  });

  const validObj = () => {
    switch (edit) {
      case 'name':
        return { required: 'Введите наименование Заказчика' };
      case 'slug':
        return {
          required: 'Введите url slug',
          pattern: {
            value: /^[a-zA-Zа-яА-Я0-9_-]*$/,
            message: 'URL slug может содержать только буквы, цифры, - и _',
          },
        };
      case 'order':
        return {
          required: 'Введите порядковый номер',
          pattern: {
            value: /^[0-9]*$/,
            message: 'Только цифры',
          },
        };
      default:
        return undefined;
    }
  };

  return (
    <Container sx={styles.dialog}>
      <Box component='form' sx={styles.form}>
        <Typography>Редактирование Заказчика</Typography>

        <Controller
          control={control}
          defaultValue={customer[edit]}
          name={edit}
          rules={validObj()}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              error={!!error}
              helperText={error ? error.message : null}
              label={edit}
              maxRows={3}
              multiline={edit === 'description'}
              size='small'
              sx={styles.input}
              type='text'
              value={value}
              fullWidth
              onChange={onChange}
            />
          )}
        />

        <Box sx={styles.actions}>
          <Button
            color='success'
            disabled={isLoading}
            variant='contained'
            endIcon={
              isLoading ? <CircularProgress color='inherit' size={20} /> : <SaveRoundedIcon />
            }
            onClick={handleEditCustomer}
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
    minHeight: '60px',
  },
};

export default memo(CustomerItemDialog);
