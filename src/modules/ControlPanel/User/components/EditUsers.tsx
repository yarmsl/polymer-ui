import {
  Box,
  Container,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import UserItem from './UserItem';
import { useGetAllUsersQuery } from '../store';

const EditUsers = (): JSX.Element => {
  const { data, isLoading } = useGetAllUsersQuery('');

  return (
    <Container maxWidth='md' sx={styles.root}>
      <TableContainer component={Paper}>
        <Box sx={styles.loader}>{isLoading && <LinearProgress color='success' />}</Box>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Доступ</TableCell>
              <TableCell>Создан</TableCell>
              <TableCell>Изменен</TableCell>
              <TableCell>Изменить</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.map((user) => (
              <UserItem key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
  loader: {
    width: '100%',
    height: '4px',
    overflow: 'hidden',
  },
};

export default EditUsers;
