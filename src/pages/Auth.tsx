import { ReactElement } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Container,
  TextField,
  ButtonGroup,
  Button,
  Typography,
  LinearProgress,
} from "@mui/material";
import HelmetTitle from "../layouts/Helmet";
import { useAppDispatch } from "../store";
import { setAuth, useSignInMutation, useSignUpMutation } from "../store/Auth";
import { batch } from "react-redux";

const styles = {
  root: {
    height: "280px",
    display: "flex",
    flexDirection: "column",
  } as const,
  title: {
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    mb: "15px",
    transform: "rotate(1deg)",
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

const Auth = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm<formLogin>();
  const [signIn, { isLoading: signInLoading }] = useSignInMutation();
  const [signUp, { isLoading: signUpLoading }] = useSignUpMutation();

  const handleSignIn = handleSubmit(async (data) => {
    try {
      const { token, id, avatar, name } = await signIn(data).unwrap();
      dispatch(setAuth(token));
    } catch (e) {
      console.log(e);
    }
  });

  const handleSignUp = handleSubmit(async (data) => {
    try {
      const { token, id } = await signUp(data).unwrap();
      dispatch(setAuth(token));
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <>
      <HelmetTitle title="Sign" />
      <Container sx={styles.root} maxWidth="xs">
        <Box sx={styles.title}>
          <Typography>Welcome to&nbsp;</Typography>
          <Typography color="secondary">Console.logbook&nbsp;</Typography>
          <Typography>- a simple notebook</Typography>
        </Box>
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
              required: "Enter your email",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Incorrect email",
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
                label="Password"
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
          <ButtonGroup
            fullWidth
            variant="contained"
            color="primary"
            disabled={signInLoading || signUpLoading}
          >
            <Button onClick={handleSignUp}>Sign up</Button>
            <Button onClick={handleSignIn}>Sign in</Button>
          </ButtonGroup>
        </Box>
        {(signInLoading || signUpLoading) && (
          <LinearProgress color="secondary" />
        )}
      </Container>
    </>
  );
};

export default Auth;
