import { FC } from 'react';
import { useHistory } from 'react-router';

import { Button, Container } from '@mui/material';

import { useGetProjectsDataQuery } from '~/store/Data';
import ProjectsDrawer from '~/UI/molecules/ProjectsDrawer';

const Projects: FC = () => {
  const { goBack } = useHistory();
  const { data, isLoading } = useGetProjectsDataQuery('');
  return (
    <Container maxWidth='md' sx={styles.root}>
      <ProjectsDrawer isLoading={isLoading} projects={data} />
      <Button color='primary' variant='contained' onClick={() => goBack()}>
        Вернуться назад
      </Button>
    </Container>
  );
};

const styles: TStyles = {
  root: {
    width: '100%',
    padding: '50px 0px 100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

export default Projects;
