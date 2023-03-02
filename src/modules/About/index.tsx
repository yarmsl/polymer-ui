import React from 'react';
import { useHistory } from 'react-router';

import { Button, Container } from '@mui/material';

import StoriesDrawer from '~/modules/About/components/StoriesDrawer';
import StoryArticlesDrawer from '~/modules/About/components/StoryArticlesDrawer';
import VacanciesDrawer from '~/modules/About/components/VacanciesDrawer';

const About: React.FC = () => {
  const router = useHistory();
  return (
    <Container maxWidth='md' sx={styles.root}>
      <StoriesDrawer />
      <StoryArticlesDrawer />
      <Button
        color='primary'
        sx={{ mb: '50px' }}
        variant='contained'
        onClick={() => router.push('/projects')}
      >
        Наши проекты
      </Button>
      <VacanciesDrawer />
      <Button color='primary' variant='contained' onClick={() => router.goBack()}>
        Вернуться назад
      </Button>
    </Container>
  );
};

const styles: TStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    pt: '50px',
    pb: '80px',
  },
};

export default React.memo(About);
