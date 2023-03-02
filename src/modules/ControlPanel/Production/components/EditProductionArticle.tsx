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

import ProductionArticleItem from './ProductionArticleItem';
import { useGetAllProductionArticlesQuery } from '../store';

const EditProductionArticle = (): JSX.Element => {
  const { data, isLoading } = useGetAllProductionArticlesQuery('');

  const sortedData = useMemo(
    () => (Array.isArray(data) ? [...data].sort((a, b) => a.order - b.order) : []),
    [data],
  );

  return (
    <Container maxWidth='md' sx={styles.root}>
      <TableContainer component={Paper}>
        <Box sx={styles.loader}>{isLoading && <LinearProgress color='success' />}</Box>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Автор</TableCell>
              <TableCell>Заголовок</TableCell>
              <TableCell>Статья</TableCell>
              <TableCell>Порядковый номер</TableCell>
              <TableCell>Создан</TableCell>
              <TableCell>Изменен</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData?.map((productionArticle) => (
              <ProductionArticleItem
                key={productionArticle._id}
                productionArticle={productionArticle}
              />
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

export default EditProductionArticle;
