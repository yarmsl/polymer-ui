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
import { useSendFileToMailMutation } from "../store/Mail";
import { showErrorSnackbar, showSuccessSnackbar } from "../store/Notifications";

const GetPresentationByEmail = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [sentToMail, { isLoading }] = useSendFileToMailMutation();
  const { control, reset, handleSubmit } = useForm<IWantFile>({
    defaultValues: { email: "" },
  });

  const handleSendMail = handleSubmit(async (data) => {
    try {
      const res = await sentToMail(data).unwrap();
      dispatch(showSuccessSnackbar(res?.message || "Проверьте вашу почту"));
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
      <Typography align="center">
        Получить презентацию на электронную почту
      </Typography>
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            size="small"
            color="secondary"
            tabIndex={1}
            sx={styles.input}
            label="Ваша электронная почта"
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
      <Button
        onClick={handleSendMail}
        startIcon={isLoading && <CircularProgress color="inherit" size={20} />}
        variant="contained"
        color="secondary"
      >
        Получить
      </Button>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "195px",
    display: "flex",
    flexDirection: "column",
    "&>*:not(:last-child)": {
      mb: "14px",
    },
  },
  input: {
    height: "50px",
  },
};

export default GetPresentationByEmail;
