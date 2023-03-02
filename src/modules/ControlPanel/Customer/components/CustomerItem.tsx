import { memo, useCallback } from 'react';

import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { Button, CircularProgress, IconButton, TableCell, TableRow, Tooltip } from '@mui/material';

import { SERVER_URL } from '~/lib/constants';
import { str2rusDate } from '~/lib/Dates';
import { useAppDispatch } from '~/store';
import { openModal } from '~/store/ModalStack';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';

import CustomerItemDialog from './CustomerItem.dialog';
import { useDeleteCustomerMutation } from '../store/';

interface ICustomerItemProps {
  customer: ICustomerFull;
}

const UserItem = ({ customer }: ICustomerItemProps) => {
  const [removeCustomer, { isLoading }] = useDeleteCustomerMutation();
  const dispatch = useAppDispatch();

  const handleDeleteCustomer = useCallback(async () => {
    try {
      const res = await removeCustomer(customer._id).unwrap();
      dispatch(showSuccessSnackbar(res.message || 'success'));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError).data.message || 'fail'));
    }
  }, [removeCustomer, customer, dispatch]);
  return (
    <TableRow>
      <TableCell>{customer.author != null ? customer.author.name : ''}</TableCell>
      <TableCell sx={styles.logo}>
        {<img alt='Лого' src={`${SERVER_URL}/${customer.logo}`} />}
      </TableCell>
      <TableCell>
        <Tooltip title='Изменить' arrow>
          <Button
            color='info'
            size='small'
            onClick={() =>
              dispatch(openModal(<CustomerItemDialog customer={customer} edit='name' />))
            }
          >
            {customer.name}
          </Button>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip title='Изменить' arrow>
          <Button
            color='info'
            size='small'
            onClick={() =>
              dispatch(openModal(<CustomerItemDialog customer={customer} edit='slug' />))
            }
          >
            {customer.slug}
          </Button>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip title='Изменить' arrow>
          <Button
            color='info'
            size='small'
            sx={styles.long}
            onClick={() =>
              dispatch(openModal(<CustomerItemDialog customer={customer} edit='description' />))
            }
          >
            {customer.description ? customer.description : 'Добавить'}
          </Button>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip title='Изменить' arrow>
          <Button
            color='info'
            size='small'
            sx={styles.long}
            onClick={() =>
              dispatch(openModal(<CustomerItemDialog customer={customer} edit='order' />))
            }
          >
            {customer.order ? customer.order : 'Добавить'}
          </Button>
        </Tooltip>
      </TableCell>
      <TableCell>{str2rusDate(customer.createdAt)}</TableCell>
      <TableCell>{str2rusDate(customer.updatedAt)}</TableCell>
      <TableCell align='right'>
        <IconButton color='error' disabled={isLoading} onClick={handleDeleteCustomer}>
          {isLoading ? (
            <CircularProgress color='inherit' size={20} />
          ) : (
            <DeleteForeverRoundedIcon />
          )}
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

const styles: TStyles = {
  long: {
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'break-all',
    whiteSpace: 'nowrap',
  },
  logo: {
    maxWidth: '300px',
    '& img': {
      width: '100%',
      objectFit: 'contain',
      objectPosition: 'center',
    },
  },
};

export default memo(UserItem);
