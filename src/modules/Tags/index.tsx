import { FC, useMemo } from 'react';
import { useHistory } from 'react-router';

import { Button, Container, Typography } from '@mui/material';

import { useGetProjectsDataQuery, useGetTagsDataQuery } from '~/store/Data';
import ProjectsDrawer from '~/UI/molecules/ProjectsDrawer';

const Tags: FC = () => {
  const router = useHistory();
  const { data: tags } = useGetTagsDataQuery('');
  const { data, isLoading } = useGetProjectsDataQuery('');

  const title = useMemo(
    () => tags?.find((tag) => `/tag/${tag.slug}` === router.location.pathname)?.name || '',
    [router.location.pathname, tags],
  );

  const projects = useMemo(
    () =>
      data?.filter((proj) =>
        proj.tags?.map((tag) => tag.slug)?.includes(router.location.pathname.substring(5)),
      ) || [],
    [data, router.location.pathname],
  );

  return (
    <Container maxWidth='md' sx={styles.root}>
      <Typography sx={styles.title} variant='h3'>
        {title}
      </Typography>
      <ProjectsDrawer isLoading={isLoading} projects={projects} />
      <Button color='primary' variant='contained' onClick={() => router.goBack()}>
        Вернуться назад
      </Button>
    </Container>
  );
};

const styles: TStyles = {
  root: {
    width: '100%',
    pt: '50px',
    pb: '80px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    width: '100%',
    textAlign: 'left',
    mb: '80px',
  },
};

export default Tags;
