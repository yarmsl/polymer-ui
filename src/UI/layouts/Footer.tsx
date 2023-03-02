import { useRouteMatch } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Container, Link, Typography } from '@mui/material';

import { ReactComponent as Logo } from '~/assets/LogoGrey.svg';
import GetPresentationByEmail from '~/UI/atoms/GetPresentationByEmail';
import FooterCarousel from '~/UI/molecules/FooterCarousel';

import { pages } from './MainLayout';

const Footer = (): JSX.Element => {
  const match = useRouteMatch();
  return (
    <Box component='footer' sx={styles.root}>
      {match.isExact && <FooterCarousel />}
      <Container maxWidth='md' sx={styles.footer}>
        <Box sx={styles.main}>
          <Box sx={styles.nav}>
            {pages.map((page, i) => (
              <Link key={i} component={RouterLink} sx={styles.link} to={page.path}>
                {page.title}
              </Link>
            ))}
          </Box>
          <Box sx={styles.logo}>
            <Logo />
            <Box>
              <Typography>УРАЛ-ПОЛИМЕР</Typography>
              <Typography>POLIDOR GROUP</Typography>
            </Box>
          </Box>
        </Box>
        <GetPresentationByEmail />
      </Container>
    </Box>
  );
};

const styles: TStyles = {
  root: {
    width: '100%',
    backgroundColor: 'secondary.light',
  },
  footer: {
    pt: { xs: '25px', sm: '' },
    width: '100%',
    height: { xs: '380px', sm: '340px' },
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    alignItems: 'center',
  },
  main: {
    flexGrow: { xs: 0, sm: 1 },
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  nav: {
    height: { xs: '', sm: '86px' },
    mb: '48px',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: { xs: 'nowrap', sm: 'wrap' },
    alignItems: 'flex-start',
  },
  link: {
    color: '#777777',
    fontSize: '14px',
    mb: '4px',
    '&:hover': {
      color: '#000',
      textDecoration: 'underline',
    },
  },
  logo: {
    height: '26px',
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',
    position: { xs: 'absolute', sm: 'static' },
    bottom: '50px',
    right: 0,
    '&>div': {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      ml: '6px',
      '& p': {
        fontSize: '12px',
        lineHeight: '12px',
        color: '#777',
      },
      '& p:first-of-type': {
        fontWeight: 700,
      },
    },
  },
};

export default Footer;
