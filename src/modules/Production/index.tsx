import React from 'react';
import { useHistory } from 'react-router';

import { Button, Container, Skeleton, Typography } from '@mui/material';

import CollapseItem from '~/modules/Production/components/CollapseItem';
import { useGetProductionArticlesDataQuery } from '~/store/Data';

const Production: React.FC = () => {
  const router = useHistory();
  const { data, isLoading } = useGetProductionArticlesDataQuery('');
  const sortdedData = React.useMemo(
    () =>
      Array.isArray(data) && data.length > 0 ? [...data].sort((a, b) => a.order - b.order) : [],
    [data],
  );

  return (
    <Container maxWidth='md' sx={styles.root}>
      {isLoading &&
        [0, 1, 2, 3, 4, 5].map((ph) => <Skeleton key={ph} variant='text' width={'100%'} />)}
      {sortdedData?.map((article) => {
        if (article.content === '') {
          return (
            <Typography key={article._id} sx={styles.title} variant='h5'>
              {article.title}
            </Typography>
          );
        } else {
          return <CollapseItem key={article._id} article={article} open={false} />;
        }
      })}
      <Button
        color='primary'
        sx={{ mt: '90px' }}
        variant='contained'
        onClick={() => router.goBack()}
      >
        Вернуться назад
      </Button>
    </Container>
  );
};

const styles: TStyles = {
  root: {
    width: '100%',
    pt: '50px',
    pb: '90px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    width: '100%',
    m: '24px 0',
    fontWeight: 700,
  },
};

export default React.memo(Production);
