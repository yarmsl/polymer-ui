import { useMemo } from 'react';

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

import StepItem from './StepItem';
import { useGetAllStepsQuery } from '../store';

const EditStep = (): JSX.Element => {
  const { data, isLoading } = useGetAllStepsQuery('');

  const sortedData = useMemo(
    () => (Array.isArray(data) ? [...data].sort((a, b) => a.order - b.order) : []),
    [data],
  );

  return (
    <Container maxWidth='lg' sx={styles.root}>
      <TableContainer component={Paper}>
        <Box sx={styles.loader}>{isLoading && <LinearProgress color='success' />}</Box>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Автор</TableCell>
              <TableCell>Изображение</TableCell>
              <TableCell>Родительская статья</TableCell>
              <TableCell>Заголовок</TableCell>
              <TableCell>Статья</TableCell>
              <TableCell>Порядковый номер</TableCell>
              <TableCell>Создана</TableCell>
              <TableCell>Изменена</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData?.map((step) => (
              <StepItem key={step._id} step={step} />
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

export default EditStep;
