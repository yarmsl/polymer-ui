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

import StoryArticleItem from './StoryArticleItem';
import { useGetAllStoryArticlesQuery } from '../store';

const EditStoryArticle = (): JSX.Element => {
  const { data, isLoading } = useGetAllStoryArticlesQuery('');

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
              <TableCell>Создана</TableCell>
              <TableCell>Изменена</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((storyArticle) => (
              <StoryArticleItem key={storyArticle._id} storyArticle={storyArticle} />
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

export default EditStoryArticle;
