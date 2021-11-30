import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import HelmetTitle from "../layouts/Helmet";
import { useAppDispatch } from "../store";
import { setAuth, useSignInMutation } from "../store/Auth";
import { showErrorSnackbar } from "../store/Notifications";
import { SxProps } from "@mui/system";
import bg from "../assets/production.webp"

const Auth = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm<formSignIn>();
  const [signIn, { isLoading: signInLoading }] = useSignInMutation();

  const handleSignIn = handleSubmit(async (data) => {
    try {
      const user = await signIn(data).unwrap();
      dispatch(setAuth(user));
    } catch (e) {
      dispatch(
        showErrorSnackbar((e as IQueryError).data?.message || "sign in error")
      );
    }
  });

  return (
    <>
      <HelmetTitle title="Авторизация" />
      <Container disableGutters sx={styles.wrapper} maxWidth={false}>
        <img src={bg} alt='bg' />
        <Container sx={styles.root} maxWidth="xs">
          <Typography variant='h6' sx={styles.title}>
            Добро пожаловать в панель управления
          </Typography>
          <Box sx={styles.form} component="form">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  color="warning"
                  tabIndex={1}
                  sx={styles.input}
                  label="Email"
                  fullWidth
                  type="text"
                  autoComplete="email"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{
                required: "Введите почту",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Введите корректный email",
                },
              }}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  tabIndex={2}
                  sx={styles.input}
                  label="Пароль"
                  fullWidth
                  type="password"
                  autoComplete="current-password"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{
                required: "Enter password",
                minLength: {
                  value: 6,
                  message: "min password length 6",
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              disabled={signInLoading}
              onClick={handleSignIn}
              startIcon={
                signInLoading && <CircularProgress color="inherit" size={20} />
              }
            >
              Войти
            </Button>
          </Box>
        </Container>
      </Container>
    </>
  );
};

const styles: Record<string, SxProps> = {
  wrapper: {
    flexGrow: 1,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '& img': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      opacity: '.3'
    }
  },
  root: {
    height: "300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: '8px',
    position: 'relative',
  },
  title: {
    mb: "15px",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    "&>*": {
      mb: "15px",
    },
  },
  input: {
    height: "82px",
  },
};

export default Auth;
