import { ReactElement, useEffect, useMemo } from "react";
import Routes from "./Routes";
import {
  CssBaseline,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import theme from "./UI/theme";
import { useAppSelector, useAppDispatch } from "./store";
import { logout, setAuth, useCheckAuthQuery } from "./store/Auth";
import useNotifier from "./lib/Notifer";

const App = (): ReactElement => {
  useNotifier();
  const dispatch = useAppDispatch();
  const { isAuth, token } = useAppSelector((st) => st.auth);
  const skipQuery = useMemo(() => !!token && isAuth === true, [isAuth, token]);
  const { data, isError } = useCheckAuthQuery("", {
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
          <Routes isAuth={isAuth} />
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
