import { useCallback, useMemo, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import { AppBar, Button, Container, IconButton } from '@mui/material';

import Logo from '~/UI/atoms/Logo';

import BurgerMenu from './BurgerMenu';
import { pages } from './MainLayout';
import { useMedia } from '../../lib/useMedia';

const Header = (): JSX.Element => {
  const router = useHistory();
  const match = useRouteMatch();
  const [burger, setBurger] = useState(false);

  const handleBurger = useCallback(() => (burger ? setBurger(false) : setBurger(true)), [burger]);

  const closeBurger = useCallback(() => setBurger(false), []);

  const open = useMemo(() => burger, [burger]);

  const { matchesHead, matchesTablet } = useMedia();
  return (
    <>
      <AppBar
        color='default'
        position='sticky'
        sx={{ zIndex: 2000, boxShadow: burger ? 'none' : '' }}
        enableColorOnDark
      >
        <Container sx={styles.header}>
          <Logo closeBurger={closeBurger} />
          {!matchesTablet && (
            <>
              {pages.map((page, i) => (
                <Button
                  key={i}
                  color='inherit'
                  sx={
                    match.path === page.path
                      ? selected
                      : page.title === 'О компании'
                      ? link
                      : styles.button
                  }
                  onClick={() => router.push(page.path)}
                >
                  {page.title}
                </Button>
              ))}
              <Button color='inherit' href='tel:+73512604064' sx={link}>
                {matchesHead ? '+7 (351) 260-40-64' : <PhoneEnabledIcon fontSize='small' />}
              </Button>
            </>
          )}
          {matchesTablet && (
            <IconButton onClick={handleBurger}>{burger ? <CloseIcon /> : <MenuIcon />}</IconButton>
          )}
        </Container>
      </AppBar>
      {matchesTablet && <BurgerMenu handle={handleBurger} open={open} />}
    </>
  );
};

const styles: TStyles = {
  header: {
    width: '100%',
    height: '62px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    height: '100%',
    borderRadius: 0,
    fontSize: '10px',
    color: '#777777',
    textTransform: 'uppercase',
    letterSpacing: { sm: '2px', md: '3px' },
  },
  phone: {
    whiteSpace: 'nowrap',
  },
  selected: {
    color: '#000',
  },
};

const link = { ...styles.button, ...styles.phone };
const selected = { ...styles.button, ...styles.selected };
export default Header;
