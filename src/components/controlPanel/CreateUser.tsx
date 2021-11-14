import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  LinearProgress,
} from "@mui/material";
import { useAppDispatch } from "../../store";
import { useSignUpMutation } from "../../store/Users";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../../store/Notifications";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  } as const,
  title: {
    mb: "15px",
    userSelect: "none",
  } as const,
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&>*": {
      mb: "15px",
    },
  } as const,
  input: {
    height: "82px",
  },
};

const CreateUser = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm<formSignUp>();
  const [signUp, { isLoading: signUpLoading }] = useSignUpMutation();

  const handleSignUp = handleSubmit(async (data) => {
    try {
      const res = await signUp(data).unwrap();
      dispatch(showSuccessSnackbar(res.message || "user successfully created"));
    } catch (e) {
      dispatch(
        showErrorSnackbar(
          (e as IQueryError).data.message || "failed to add user"
        )
      );
    }
  });

  return (
    <Container sx={styles.root} maxWidth="xs">
      <Typography variant="h5" sx={styles.title}>Создание нового пользователя</Typography>
      <Box sx={styles.form} component="form">
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              tabIndex={1}
              sx={styles.input}
              label="Имя"
              fullWidth
              type="text"
              autoComplete="off"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          rules={{
            required: "Введите имя",
          }}
        />
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
              autoComplete="off"
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
              autoComplete="name"
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
          color="success"
          disabled={signUpLoading}
          onClick={handleSignUp}
          endIcon={<AddRoundedIcon />}
        >
          Создать
        </Button>
      </Box>
      {signUpLoading && <LinearProgress color="secondary" />}
    </Container>
  );
};

export default CreateUser;
