import React from 'react';
import { useHistory } from 'react-router';

import { Box, Button, Container, Typography } from '@mui/material';

import { SERVER_URL } from '~/lib/constants';

import JointProjectCard, { SkeletonJointProjectCard } from './components/JointProjectCard';

interface ICustomerProps {
  customer?: ICustomerFull;
  isLoading?: boolean;
}

const Customer: React.FC<ICustomerProps> = ({ customer, isLoading = false }) => {
  const { goBack } = useHistory();

  return (
    <Container maxWidth='md' sx={styles.root}>
      <Box sx={styles.header}>
        <Box sx={styles.title}>
          <Typography sx={styles.ht} variant='h3'>
            Совместные проекты:
          </Typography>
          <Typography variant='h3'>{customer?.name}</Typography>
          <Typography textAlign='justify' variant='subtitle1'>
            {customer?.description}
          </Typography>
        </Box>
        <Box sx={styles.logo}>
          <img alt='Лого' src={`${SERVER_URL}/${customer?.logo}`} />
        </Box>
      </Box>
      <Box sx={styles.projects}>
        {isLoading
          ? [0, 1].map((ph) => <SkeletonJointProjectCard key={ph} />)
          : customer?.projects?.map((project) => (
              <JointProjectCard key={project._id} project={project} />
            ))}
      </Box>
      <Button color='primary' variant='contained' onClick={() => goBack()}>
        Вернуться назад
      </Button>
    </Container>
  );
};

const styles: TStyles = {
  root: {
    width: '100%',
    pt: '80px',
    pb: '80px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
  },
  title: {
    order: { xs: 1, md: 0 },
    flexGrow: { xs: 0, md: 1 },
    pr: '18px',
    textAlign: { xs: 'center', md: 'left' },
  },
  ht: {
    color: 'primary.main',
    lineHeight: 1,
  },
  logo: {
    display: 'flex',
    order: { xs: 0, md: 1 },
    minWidth: { xs: '100%', md: '25%' },
    p: { xs: '0 15%', sm: '0 20%', md: '0' },
    mb: { xs: '18px', md: '' },
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      objectPosition: 'center',
    },
  },
  projects: {
    width: '100%',
    p: '50px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '&>*:not(:last-child)': {
      mb: '14px',
    },
  },
};

export default React.memo(Customer);
