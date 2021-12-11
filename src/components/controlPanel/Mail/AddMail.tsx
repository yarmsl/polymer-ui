import {
  Box,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { SxProps } from "@mui/system";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch } from "../../../store";
import { useAddMailsMutation } from "../../../store/Mail";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../../../store/Notifications";

const AddMail = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [addMailaddrss, { isLoading }] = useAddMailsMutation();
  const { control, handleSubmit, reset } = useForm<IAddMails>({
    defaultValues: {
      email: "",
      pass: "",
      provider: "Mail.ru",
      feedback: "",
    },
  });

  const handleAddMails = handleSubmit(async (data) => {
    try {
      const res = await addMailaddrss(data).unwrap();
      dispatch(showSuccessSnackbar(res.message || "Почтовые адреса добавлены"));
      reset();
    } catch (e) {
      dispatch(
        showErrorSnackbar(
          (e as IQueryError)?.data?.message || "fail"
        )
      );
    }
  });

  return (
    <Container sx={styles.wrapper} maxWidth={"xs"}>
      <Box sx={styles.root} component="form">
        <Typography gutterBottom variant="h6">
          Добавление почтовых адресов
        </Typography>
        <Typography gutterBottom align="justify" variant="subtitle2">
          Для настройки почты для рассылки доступны сервисы Yandex, Mail.ru или
          Yahoo, возможно потребуются дополнительные настройки почтового ящика.
          Ссылка на настройки придет в уведомлении об ошибке. Почта для обратной
          связи может быть любой.
        </Typography>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"warning"}
              tabIndex={1}
              sx={styles.input}
              label="Почта (yahoo, yandex или mail.ru)"
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
          name="provider"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              tabIndex={2}
              sx={styles.input}
              label="Выберите сервис"
              fullWidth
              select
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            >
              {["Yahoo", "Yandex", "Mail.ru"].map((ser) => (
                <MenuItem key={ser} value={ser}>
                  {ser}
                </MenuItem>
              ))}
            </TextField>
          )}
          rules={{
            required: "Выберите сервис",
          }}
        />
        <Controller
          name="pass"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              tabIndex={2}
              sx={styles.input}
              label="Пароль от неё"
              fullWidth
              type="password"
              autoComplete="off"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          rules={{
            required: "Введите пароль",
          }}
        />
        <Controller
          name="feedback"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"warning"}
              tabIndex={1}
              sx={styles.input}
              label="Почта, для обратной связи"
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
            required: "Введите почту для обратной связи",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Введите корректный email",
            },
          }}
        />
        <Button
          startIcon={
            isLoading && <CircularProgress size={20} color="inherit" />
          }
          color="info"
          variant="contained"
          onClick={handleAddMails}
        >
          Сохранить
        </Button>
      </Box>
    </Container>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    height: "60px",
    mt: "12px",
  },
};

export default AddMail;
