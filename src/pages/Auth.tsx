import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  LinearProgress,
} from "@mui/material";
import HelmetTitle from "../layouts/Helmet";
import { useAppDispatch } from "../store";
import { setAuth, useSignInMutation } from "../store/Auth";
import { showErrorSnackbar } from "../store/Notifications";

const styles = {
  root: {
    height: "280px",
    display: "flex",
    flexDirection: "column",
  } as const,
  title: {
    mb: "15px",
    userSelect: "none",
  } as const,
  form: {
    "&>*": {
      mb: "15px",
    },
  },
  input: {
    height: "82px",
  },
};

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
        showErrorSnackbar((e as IQueryError).data.message || "sign in error")
      );
    }
  });

  return (
    <>
      <HelmetTitle title="Авторизация" />
      <Container sx={styles.root} maxWidth="xs">
        <Typography sx={styles.title}>
          Добро пожаловать в панель управления
        </Typography>
        <Box sx={styles.form} component="form">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
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
            render={({ field: { onChange, value }, fieldState: { error } }) => (
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
          >
            Sign in
          </Button>
        </Box>
        {signInLoading && <LinearProgress color="secondary" />}
      </Container>
    </>
  );
};

export default Auth;
