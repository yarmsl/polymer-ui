import { FC, memo, useMemo } from 'react';
import { useHistory } from 'react-router';

import { Box, Button, Container, Typography } from '@mui/material';

import { SERVER_URL } from '~/lib/constants';
import { useMedia } from '~/lib/useMedia';

interface IProjectProps {
  project?: IProjectFull;
}

const Project: FC<IProjectProps> = ({ project }) => {
  const router = useHistory();
  const { matchesHead } = useMedia();

  const photoes = useMemo(() => {
    if (project != null && Array.isArray(project.images) && project.images.length > 1) {
      return project.images.filter((_, i) => i !== 0) || [];
    } else return [];
  }, [project]);

  return (
    <Container maxWidth='md' sx={styles.root}>
      <Box sx={styles.main}>
        {matchesHead && <Typography sx={styles.year}>{project?.year}</Typography>}
        <img alt='Проект' src={`${SERVER_URL}/${project?.images[0]}`} />
      </Box>
      <Box sx={styles.info}>
        {!matchesHead && <Typography sx={styles.yearMob}>{project?.year}</Typography>}
        <Typography sx={styles.title} variant='h3'>
          {project?.title}
        </Typography>
        <Typography variant='h6'>
          <b>Проект:</b> {project?.title}
        </Typography>
        {project?.customer && (
          <Typography variant='h6'>
            <b>Заказчик:</b> {project.customer.name}
          </Typography>
        )}
        {project?.done && (
          <Typography variant='h6'>
            <b>Выполненные работы:</b>
            <br /> {project.done}
          </Typography>
        )}
      </Box>
      {photoes.length > 0 && (
        <Box sx={styles.photoes}>
          <Box sx={styles.wrapper}>
            {photoes.map((photo, i) => {
              return (
                <Box key={i} sx={styles.photo}>
                  <img alt='Проект' src={`${SERVER_URL}/${photo}`} />
                </Box>
              );
            })}
            <Typography variant='subtitle1'>Изображения взяты из открытых источников</Typography>
          </Box>
        </Box>
      )}
      <Button color='primary' variant='contained' onClick={() => router.goBack()}>
        Вернуться назад
      </Button>
    </Container>
  );
};

const styles: TStyles = {
  root: {
    width: '100%',
    p: '30px 0 80px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  main: {
    width: '100%',
    height: { xs: '300px', sm: '560px' },
    position: 'relative',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      borderRadius: { xs: '0px', sm: '5px' },
      overflow: 'hidden',
    },
  },
  year: {
    width: '350px',
    textAlign: 'center',
    position: 'absolute',
    transform: 'rotate(90deg) translateX(55%)',
    color: 'primary.main',
    fontSize: '144px',
    fontWeight: 700,
    lineHeight: 1,
    right: '-175px',
    userSelect: 'none',
  },
  yearMob: {
    color: 'primary.main',
    fontSize: '96px',
    fontWeight: 700,
  },
  info: {
    width: '100%',
    p: { xs: '0 30px', sm: '' },
    mb: '40px',
    '&>*': {
      mb: '12px',
    },
  },
  title: {
    color: 'primary.main',
  },
  photoes: {
    width: '100%',
    mb: '45px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  wrapper: {
    width: '100%',
    p: { xs: '0 30px', sm: '' },
    display: 'flex',
    flexWrap: 'wrap',
  },
  photo: {
    width: { xs: '50%', sm: '33.33%' },
    p: '5px',
    boxSizing: 'border-box',
    height: '190px',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      borderRadius: '5px',
      overflow: 'hidden',
    },
  },
};

export default memo(Project);
