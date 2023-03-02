import { Box, Container, Typography } from '@mui/material';

import Leo404 from '~/assets/leo404.webp';
import { useMedia } from '~/lib/useMedia';
import DownloadPres from '~/UI/atoms/DownloadPres';
import HelmetTitle from '~/UI/atoms/Helmet';
import MainLayout from '~/UI/layouts/MainLayout';

const NotFound = (): JSX.Element => {
  const { matchesDesktop } = useMedia();
  return (
    <MainLayout>
      <HelmetTitle title='Страница не найдена' />
      <Container maxWidth='md' sx={styles.root}>
        <Box sx={styles.wrapper}>
          <Box sx={styles.main}>
            <Box sx={styles.img}>
              <img alt='404' src={Leo404} />
            </Box>
            <Typography sx={styles.title}>404</Typography>
          </Box>
          {matchesDesktop && (
            <Box sx={styles.notfound}>
              <Typography sx={{ mb: '24px' }} variant='h6'>
                Страница не найдена
              </Typography>
              <Typography sx={{ fontWeight: 400 }} variant='h6'>
                Возможно она была перемещена, или вы просто неверно указали адрес страницы.
              </Typography>
            </Box>
          )}
        </Box>
        <Box sx={styles.desc}>
          <Typography sx={{ color: 'primary.main', fontWeight: 700 }} variant='h5'>
            «Не оборачивается тот, кто устремлён к звёздам»
          </Typography>
          <Typography sx={{ fontWeight: 700 }}>Леонардо да Винчи</Typography>
        </Box>
        <DownloadPres />
      </Container>
    </MainLayout>
  );
};

const styles: TStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    p: '30px 0 65px',
    userSelect: 'none',
  },
  wrapper: {
    width: '100%',
    height: '240px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  main: {
    width: { xs: '100%', sm: '100%', md: '60%' },
    position: 'relative',
    display: 'flex',
    justifyContent: { xs: 'center', sm: 'center', md: 'flex-start' },
    alignItems: 'center',
  },
  img: {
    width: '200px',
    '& img': {
      width: '100%',
      objectFit: 'contain',
    },
  },
  title: {
    position: { md: 'absolute' },
    top: 0,
    right: '0px',
    fontSize: { xs: '120px', sm: '120px', md: '200px' },
    lineHeight: '200px',
    fontWeight: 700,
    color: 'primary.main',
  },
  notfound: {
    width: '35%',
  },
  desc: {
    width: '100%',
    mb: '24px',
    textAlign: { xs: 'center', sm: 'center', md: 'left' },
  },
};

export default NotFound;
