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

import CustomerItem from './CustomerItem';
import { useGetAllCustomersQuery } from '../store';

const EditCustomer = (): JSX.Element => {
  const { data, isLoading } = useGetAllCustomersQuery('');

  return (
    <Container maxWidth='lg' sx={styles.root}>
      <TableContainer component={Paper}>
        <Box sx={styles.loader}>{isLoading && <LinearProgress color='success' />}</Box>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Автор</TableCell>
              <TableCell>Лого</TableCell>
              <TableCell>Заказчик</TableCell>
              <TableCell>URL slug</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell>Порядковый номер</TableCell>
              <TableCell>Создан</TableCell>
              <TableCell>Изменен</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.map((customer) => (
              <CustomerItem key={customer._id} customer={customer} />
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

export default EditCustomer;
