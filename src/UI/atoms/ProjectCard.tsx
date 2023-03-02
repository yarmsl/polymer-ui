import { memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Skeleton, Typography } from '@mui/material';

import { SERVER_URL } from '~/lib/constants';

interface IProjectCardProps {
  project: IProjectFull;
}

export const SkeletonProjectCard = (): JSX.Element => {
  return (
    <Box sx={styles.root}>
      <Skeleton height={185} variant='rectangular' width={270} />
      <Skeleton variant='text' />
      <Skeleton variant='text' />
    </Box>
  );
};

const ProjectCard = ({ project }: IProjectCardProps): JSX.Element => {
  return (
    <Box component={RouterLink} sx={styles.root} to={`/project/${project.slug}`}>
      <Box sx={styles.imgWrapper}>
        <img alt={project.title} src={`${SERVER_URL}/${project.images[0]}`} />
      </Box>
      <Typography sx={styles.title} variant='h6'>
        {project.title}
      </Typography>
      <Typography sx={styles.link}>Смотреть подробнее</Typography>
    </Box>
  );
};

const styles: TStyles = {
  root: {
    width: { xs: '100%', sm: '50%', md: '33.33%' },
    height: { xs: '320px', sm: '270px' },
    p: '0 7px',
    mb: '33px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textDecoration: 'none',
    color: '#000',
  },
  imgWrapper: {
    width: '100%',
    minHeight: { xs: '235px', sm: '185px' },
    height: { xs: '235px', sm: '185px' },
    borderRadius: '5px',
    overflow: 'hidden',
    mb: '10px',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
    },
  },
  title: {
    height: '42px',
    lineHeight: 1.2,
    overflow: 'hidden',
  },
  link: {
    color: 'primary.main',
    fontSize: '18px',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};

export default memo(ProjectCard);
