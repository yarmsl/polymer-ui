import { FC, Suspense, useMemo, lazy, memo } from 'react';
import { useRouteMatch } from 'react-router';

import { Container } from '@mui/material';

import Loading from '~/UI/atoms/Loading';
import MainBanner from '~/UI/molecules/MainBanner';

import Header from './Header';

const Footer = lazy(() => import('./Footer'));

export const pages = [
  {
    title: 'Промышленный дизайн и инжиниринг',
    path: '/indastrial_design_and_engineering',
  },
  { title: 'Производство', path: '/production' },
  { title: 'Проекты', path: '/projects' },
  { title: 'О компании', path: '/about' },
  { title: 'Контакты', path: '/contacts' },
];

const MainLayout: FC<Child> = ({ children }) => {
  const match = useRouteMatch();
  const showBanner = useMemo(
    () =>
      ['/', ...pages.map((page) => page.path).filter((path) => path !== '/contacts')].includes(
        match.path,
      ) && match.isExact,
    [match],
  );
  return (
    <>
      <Header />
      {showBanner && <MainBanner />}
      <Container maxWidth={false} sx={styles.root} disableGutters>
        <>{children}</>
      </Container>
      <Suspense fallback={<Loading />}>
        <Footer />
      </Suspense>
    </>
  );
};

const styles: TStyles = {
  root: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
};

export default memo(MainLayout);
