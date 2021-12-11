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
import { useAddVacancyMutation } from "../../../store/Vacancy";

const AddVacancy = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { handleSubmit, control, reset } = useForm<IAddVacancy>({
    defaultValues: {
      title: "",
      requirements: "",
      wage: "" as unknown as number,
    },
  });
  const [newVacancy, { isLoading }] = useAddVacancyMutation();

  const handleNewVacancy = handleSubmit(async (data) => {
    try {
      const res = await newVacancy(data).unwrap();
      dispatch(showSuccessSnackbar(`Вакансия ${res.title} сохранена`));
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
          name="title"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"info"}
              tabIndex={1}
              sx={styles.input}
              label="Вакансия"
              fullWidth
              type="text"
              autoComplete="off"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          rules={{ required: "Введите вакансию" }}
        />

        <Controller
          name="requirements"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"info"}
              tabIndex={1}
              sx={styles.input}
              label="Требования"
              multiline
              minRows={3}
              maxRows={8}
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
            required: "Введите Требования",
          }}
        />

        <Controller
          name="wage"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              size="small"
              color={"info"}
              tabIndex={1}
              sx={styles.input}
              label="Заработная плата от (руб)"
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
            required: "Введите заработную плату",
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
          onClick={handleNewVacancy}
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

export default AddVacancy;
