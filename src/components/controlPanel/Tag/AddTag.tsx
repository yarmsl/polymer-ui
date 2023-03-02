import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../store";
import { useAddTagMutation } from "../../../store/Tag";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../../../store/Notifications";

const AddTag = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { handleSubmit, control, reset } = useForm<IAddTag>({
    defaultValues: { name: "", slug: "", order: "" as unknown as number },
  });
  const [newTag, { isLoading }] = useAddTagMutation();

  const handleNewTag = handleSubmit(async (data) => {
    try {
      const res = await newTag(data).unwrap();
      dispatch(showSuccessSnackbar(`Тег ${res.name} успешно создан`));
      reset();
    } catch (e) {
      dispatch(
        showErrorSnackbar(
          (e as IQueryError)?.data?.message || "failed to add user"
        )
      );
    }
  });
  return (
    <Container maxWidth={"xs"}>
      <Box sx={styles.form} component="form">
        <Typography variant="h6" sx={{ mb: "12px" }}>
          Добавление нового тега
        </Typography>
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"info"}
              tabIndex={1}
              sx={styles.input}
              label="Тег"
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
            required: "Введите название тега",
          }}
        />
        <Controller
          name="slug"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"info"}
              tabIndex={1}
              sx={styles.input}
              label="URL slug"
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
            required: "Введите url slug",
            pattern: {
              value: /^[a-zA-Zа-яА-Я0-9_-]*$/,
              message: "URL slug может содержать только буквы, цифры, - и _",
            },
          }}
        />
        <Controller
          name="order"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"info"}
              tabIndex={1}
              sx={styles.input}
              label="Порядковый номер тега"
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
            required: "Введите порядковый номер",
            pattern: {
              value: /^[0-9]*$/,
              message: "Только цифры",
            },
          }}
        />
        <Typography variant="subtitle2">
          *URL slug будет отображаться в строке браузера
        </Typography>
        <Button
          variant="contained"
          color="success"
          disabled={isLoading}
          onClick={handleNewTag}
          endIcon={
            isLoading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              <AddRoundedIcon />
            )
          }
        >
          Добавить
        </Button>
      </Box>
    </Container>
  );
};

const styles: TStyles = {
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&>*": {
      mb: "8px",
    },
  },
  input: {
    height: "68px",
  },
};

export default AddTag;
