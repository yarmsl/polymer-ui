import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Container,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useAppDispatch } from "../../store";
import { useSignUpMutation } from "../../store/Users";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../../store/Notifications";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { SxProps } from "@mui/system";

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
          (e as IQueryError)?.data?.message || "failed to add user"
        )
      );
    }
  });

  return (
    <Container sx={styles.root} maxWidth="xs">
      <Box sx={styles.form} component="form">
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              color={"info"}
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
              color={"warning"}
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
          endIcon={
            signUpLoading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              <AddRoundedIcon />
            )
          }
        >
          Создать
        </Button>
      </Box>
    </Container>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&>*": {
      mb: "15px",
    },
  },
  input: {
    height: "82px",
  },
};

export default CreateUser;
