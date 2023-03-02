import { useCallback } from 'react';

import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { Paper, Container, Typography, IconButton, CircularProgress } from '@mui/material';

import { useAppDispatch } from '~/store';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';

import { useDeleteMailsMutation, useGetMailsQuery } from '../store';

const EditMail = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { data } = useGetMailsQuery('');
  const [deleteMails, { isLoading }] = useDeleteMailsMutation();

  const removeMails = useCallback(async () => {
    try {
      const res = await deleteMails('').unwrap();
      dispatch(showSuccessSnackbar(res?.message || 'Адреса успешно удалён'));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || 'fail'));
    }
  }, [deleteMails, dispatch]);

  return (
    <Container maxWidth='sm'>
      {data != null && (
        <Paper sx={styles.mails}>
          <Typography>Почта для рассылки: {data.email}</Typography>
          <Typography>Почта для обратной связи: {data.feedback}</Typography>
          <IconButton color='error' sx={styles.remove} onClick={removeMails}>
            {isLoading ? <CircularProgress size={24} /> : <DeleteForeverRoundedIcon />}
          </IconButton>
        </Paper>
      )}
    </Container>
  );
};

const styles: TStyles = {
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mails: {
    position: 'relative',
    width: '100%',
    p: '8px',
  },
  remove: {
    position: 'absolute',
    top: '8px',
    right: '8px',
  },
};

export default EditMail;
