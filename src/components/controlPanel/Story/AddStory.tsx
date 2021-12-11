import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { SxProps } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../store";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../../../store/Notifications";
import { useAddStoryMutation } from "../../../store/Story";

const AddStory = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { handleSubmit, control, reset } = useForm<IAddStory>({
    defaultValues: {
      content: "",
      from: "" as unknown as number,
      to: "" as unknown as number,
    },
  });
  const [newStory, { isLoading }] = useAddStoryMutation();

  const handleNewStory = handleSubmit(async (data) => {
    try {
      const res = await newStory(data).unwrap();
      dispatch(showSuccessSnackbar(`История ${res.from} сохранена`));
      reset();
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || "fail"));
    }
  });

  return (
    <Container maxWidth={"xs"}>
      <Box sx={styles.form} component="form">
        <Typography align="center" variant="h6" sx={{ mb: "12px" }}>
          Новая История на странице О компании
        </Typography>

        <Controller
          name="content"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"info"}
              tabIndex={1}
              multiline
              minRows={3}
              maxRows={8}
              sx={styles.input}
              label="Статья"
              fullWidth
              type="text"
              autoComplete="off"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          rules={{ required: "Напишите историю" }}
        />

        <Controller
          name="from"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"info"}
              tabIndex={1}
              sx={styles.input}
              label="Год (с какого года)"
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
            required: "Введите год",
            pattern: {
              value: /^[0-9]*$/,
              message: "Только цифры",
            },
          }}
        />

        <Controller
          name="to"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"info"}
              tabIndex={1}
              sx={styles.input}
              label="По какой год *(НЕобязательно)"
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
            pattern: {
              value: /^[0-9]*$/,
              message: "Только цифры",
            },
          }}
        />

        <Button
          variant="contained"
          color="success"
          disabled={isLoading}
          onClick={handleNewStory}
          endIcon={
            isLoading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              <AddRoundedIcon />
            )
          }
        >
          Сохранить
        </Button>
      </Box>
    </Container>
  );
};

const styles: Record<string, SxProps> = {
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&>*": {
      mb: "6px!important",
    },
  },
  input: {
    minHeight: "68px",
    mt: "16px",
  },
};

export default AddStory;
