import { FC, memo, useMemo } from 'react';
import { useHistory } from 'react-router';

import { Box, Button, Skeleton, Typography } from '@mui/material';

import { SERVER_URL } from '../../../lib/constants';

interface ICustomCardProps {
  customer: ICustomerFull;
}

export const SkeletonCustomerCard = (): JSX.Element => {
  return (
    <Box sx={styles.root}>
      <Skeleton height={60} variant='rectangular' width={210} />
      <Skeleton variant='text' width={210} />
      <Skeleton variant='text' width={210} />
      <Box sx={styles.phWrapper}>
        <Box sx={styles.photoes4}>
          {[0, 1, 2, 3].map((ph) => (
            <Skeleton key={ph} sx={styles.photo4} variant='rectangular' />
          ))}
        </Box>
      </Box>
      <Skeleton height={36} variant='rectangular' width={210} />
    </Box>
  );
};

const CustomerCard: FC<ICustomCardProps> = ({ customer }) => {
  const router = useHistory();
  const images = useMemo(() => {
    if (customer && Array.isArray(customer.projects) && customer.projects.length > 0) {
      return [...customer.projects]
        .sort((a, b) => a.order - b.order)
        .map((proj) => (proj.images.length > 0 ? proj.images[0] : ''))
        .slice(0, 4);
    } else {
      return [];
    }
  }, [customer]);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgWrapper}>
        <img alt={customer.name} src={`${SERVER_URL}/${customer.logo}`} />
      </Box>
      <Typography sx={styles.title}>{customer.name}</Typography>
      <Box sx={styles.phWrapper}>
        {images.length === 4 && (
          <Box sx={styles.photoes4}>
            {images?.map((img, i) => (
              <Box key={i} sx={styles.photo4}>
                {<img alt='Проект' src={`${SERVER_URL}/${img}`} />}
              </Box>
            ))}
          </Box>
        )}

        {images.length === 3 && (
          <Box sx={styles.photoes3}>
            {images?.map((img, i) => (
              <Box key={i} sx={styles.photo3}>
                {<img alt='Проект' src={`${SERVER_URL}/${img}`} />}
              </Box>
            ))}
          </Box>
        )}

        {images.length === 2 && (
          <Box sx={styles.photoes2}>
            {images?.map((img, i) => (
              <Box key={i} sx={styles.photo2}>
                {<img alt='Проект' src={`${SERVER_URL}/${img}`} />}
              </Box>
            ))}
          </Box>
        )}

        {images.length === 1 && (
          <Box sx={styles.photo1}>
            <img alt='Проект' src={`${SERVER_URL}/${images[0]}`} />
          </Box>
        )}
      </Box>
      <Button
        color='primary'
        variant='contained'
        fullWidth
        onClick={() => router.push(`/customer/${customer.slug}`)}
      >
        Смотреть проекты
      </Button>
    </Box>
  );
};

const styles: TStyles = {
  root: {
    width: '270px',
    maxWidth: '270px',
    boxSizing: 'border-box',
    p: '25px 30px 44px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: '5px',
  },
  imgWrapper: {
    width: '100%',
    height: '60px',
    mb: '5px',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      objectPosition: 'center',
    },
  },
  title: {
    height: '32px',
    maxHeight: '32px',
    overflow: 'hidden',
    textAlign: 'center',
    fontSize: '11px',
  },
  phWrapper: {
    width: '100%',
    height: '210px',
    mb: '30px',
  },
  photo1: {
    width: '100%',
    height: '100%',
    borderRadius: '5px',
    overflow: 'hidden',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
    },
  },
  photoes2: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  photo2: {
    width: '100%',
    height: '100px',
    borderRadius: '5px',
    overflow: 'hidden',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
    },
  },
  photoes3: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    '&>div:first-of-type': {
      width: '100%',
      height: '100px',
      borderRadius: '5px',
      overflow: 'hidden',
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
      },
    },
    '&>div:not(:first-of-type)': {
      width: '100px',
      height: '100px',
      borderRadius: '5px',
      overflow: 'hidden',
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
      },
    },
  },
  photoes4: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  photo4: {
    width: '100px',
    height: '100px',
    borderRadius: '5px',
    overflow: 'hidden',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
    },
  },
};

export default memo(CustomerCard);
