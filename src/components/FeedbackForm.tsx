import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { SxProps } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch } from "../store";
import { useFeedbackMutation } from "../store/Mail";
import { showErrorSnackbar, showSuccessSnackbar } from "../store/Notifications";

const FeedbackForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [sendFeedback, { isLoading }] = useFeedbackMutation();
  const { control, handleSubmit, reset } = useForm<Ifeedback>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const handleFeedback = handleSubmit(async (data) => {
    try {
      console.log(data);
        const res = await sendFeedback(data).unwrap();
        dispatch(showSuccessSnackbar(res?.message || "Мы свяжемся с вами"));
        reset();
    } catch (e) {
      dispatch(
        showErrorSnackbar(
          (e as IQueryError)?.data?.message || "Поробуйте в другой раз"
        )
      );
    }
  });

  return (
    <Box sx={styles.root} component="form">
      <Typography align="center" variant="h5" component="p" color="white">
        Заполните форму и мы свяжемся с вами!
      </Typography>
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            color="secondary"
            tabIndex={1}
            sx={styles.input}
            placeholder="Как к вам обращаться?"
            fullWidth
            type="text"
            autoComplete="off"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            color="secondary"
            tabIndex={1}
            sx={styles.input}
            placeholder="Электронная почта (обязательно)"
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
        name="phone"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            color="secondary"
            tabIndex={1}
            sx={styles.input}
            placeholder="Номер телефона (обязательно)"
            fullWidth
            type="tel"
            autoComplete="off"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{
          required: "Введите номер",
          pattern: {
            value: /^[0-9+()_-]*$/,
            message: "Введите правильный номер",
          },
          minLength: {
            value: 7,
            message: "Введите правильный номер",
          },
        }}
      />
      <Button
        startIcon={isLoading && <CircularProgress color="inherit" size={20} />}
        onClick={handleFeedback}
        size="large"
        variant="contained"
        color="primary"
      >
        Отправить
      </Button>
      <Typography align="center" variant="subtitle2" color="white">
        Нажимая на кнопку, вы даете согласие на обработку персональных данных и
        соглашаетесь с политикой конфиденциальности
      </Typography>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    maxWidth: "480px",
    minWidth: "320px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&>*:not(:last-child)": { mb: "12px" },
  },
  input: {
    height: "65px",
    "& input": {
      background: "#fff",
      borderRadius: "5px",
    },
    "& .MuiFormHelperText-root.Mui-error": {
      color: "#fff",
    },
  },
};

export default FeedbackForm;
