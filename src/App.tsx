import { ReactElement, useEffect, useMemo } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { CssBaseline, ThemeProvider, StyledEngineProvider } from '@mui/material';

import { logout, setAuth, useCheckAuthQuery } from '~/modules/ControlPanel/Auth/store';
import Routes from '~/Routes';
import { useAppSelector, useAppDispatch } from '~/store';
import ModalStack from '~/UI/atoms/ModalStack';
import useNotifier from '~/UI/atoms/Notifer';
import theme from '~/UI/theme';

const App = (): ReactElement => {
  useNotifier();
  const dispatch = useAppDispatch();
  const { isAuth, token, role } = useAppSelector((st) => st.auth);
  const skipQuery = useMemo(() => !token, [token]);
  const { data, isError } = useCheckAuthQuery('', {
    skip: skipQuery,
  });
  useEffect(() => {
    if (data) {
      dispatch(setAuth(data));
    }
    if (isError) {
      dispatch(logout());
    }
  }, [data, dispatch, isError]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes isAuth={isAuth} role={role} />
        </Router>
        <ModalStack />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
