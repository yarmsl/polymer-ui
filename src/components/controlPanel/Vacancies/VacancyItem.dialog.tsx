import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { memo } from "react";
import { useAppDispatch } from "../../../store";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../../../store/Notifications";
import { closeModalAction } from "../../../store/ModalStack";
import { SxProps } from "@mui/system";
import { useEditVacancyMutation } from "../../../store/Vacancy";

export type vacancyEditTypes = "title" | "requirements" | "wage";

interface IVacancyDialogProps {
  vacancy: IVacancyFull;
  edit: vacancyEditTypes;
}

const VacancyItemDialog = ({
  vacancy,
  edit,
}: IVacancyDialogProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [editVacancy, { isLoading }] = useEditVacancyMutation();
  const { handleSubmit, control } = useForm<ISendVacancy>();

  const handleEditVacancy = handleSubmit(async (data) => {
    try {
      const sendData = { id: vacancy._id, data };
      const res = await editVacancy(sendData).unwrap();
      dispatch(showSuccessSnackbar(`Вакансия ${res.title} изменена`));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || "fail"));
    }
  });

  const validObj = () => {
    switch (edit) {
      case "title":
        return { required: "Введите вакансию" };
      case "wage":
        return {
          required: "Введите заработную плату",
          pattern: {
            value: /^[0-9]*$/,
            message: "Только цифры",
          },
        };
      case "requirements":
        return { required: "Введите Требования" };
      default:
        return undefined;
    }
  };

  return (
    <Container sx={styles.dialog}>
      <Box sx={styles.form} component="form">
        <Typography>Редактирование Вакансии</Typography>

        {(edit === "title" || edit === "requirements" || edit === "wage") && (
          <Controller
            name={edit}
            control={control}
            defaultValue={vacancy[edit]}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                size="small"
                tabIndex={1}
                sx={styles.input}
                label={edit}
                fullWidth
                multiline={edit === "requirements"}
                minRows={5}
                maxRows={12}
                type="text"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            rules={validObj()}
          />
        )}

        <Box sx={styles.actions}>
          <Button
            variant="contained"
            color="success"
            endIcon={
              isLoading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                <SaveRoundedIcon />
              )
            }
            onClick={handleEditVacancy}
            disabled={isLoading}
          >
            Сохранить
          </Button>
          <Button
            variant="contained"
            onClick={() => dispatch(closeModalAction())}
          >
            Закрыть
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

const styles: Record<string, SxProps> = {
  actions: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  dialog: {
    padding: "24px",
  },
  form: {
    width: { sm: "300px", md: "600px" },
    "&>*:not(:last-child)": {
      mb: "12px",
    },
  },
  input: {
    minHeight: "60px",
  },
};

export default memo(VacancyItemDialog);
