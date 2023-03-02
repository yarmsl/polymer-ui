import { Fragment, memo } from 'react';
import { useHistory } from 'react-router';

import { Box, Button, Divider, List, ListItemButton, SwipeableDrawer } from '@mui/material';

import { pages } from './MainLayout';
import { SERVER_URL } from '../../lib/constants';

interface IBurgerMenuProps {
  open: boolean;
  handle: () => void;
}

const BurgerMenu = ({ open, handle }: IBurgerMenuProps): JSX.Element => {
  const router = useHistory();
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  return (
    <SwipeableDrawer
      anchor='right'
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      open={open}
      sx={{ opacity: 0.95 }}
      onClose={handle}
      onOpen={handle}
    >
      <Box sx={styles.root}>
        <List sx={styles.list}>
          {pages.map((page, i) => (
            <Fragment key={i}>
              <ListItemButton
                sx={styles.listButton}
                onClick={() => {
                  router.push(page.path);
                  handle();
                }}
              >
                {page.title}
              </ListItemButton>
              <Divider />
            </Fragment>
          ))}
        </List>
        <ListItemButton component='a' href='tel:+73512604064' sx={styles.listButton}>
          +7 (351) 260-40-64
        </ListItemButton>
        <Button
          color='primary'
          href={`${SERVER_URL}/api/file`}
          size='large'
          sx={{ mt: '16px' }}
          variant='contained'
        >
          Скачайте презентацию
        </Button>
      </Box>
    </SwipeableDrawer>
  );
};

const styles: TStyles = {
  root: {
    width: '100%',
    pt: '62px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  listButton: {
    fontSize: '16px',
    color: '#515759',
    letterSpacing: '0.31em',
    textTransform: 'uppercase',
    lineHeight: 1.8,
    p: '18px 24px',
  },
};

export default memo(BurgerMenu);
