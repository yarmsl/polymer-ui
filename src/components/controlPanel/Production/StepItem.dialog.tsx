import {
  Box,
  Button,
  CircularProgress,
  Container,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { memo, useMemo } from "react";
import { useAppDispatch } from "../../../store";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../../../store/Notifications";
import { closeModalAction } from "../../../store/ModalStack";
import { SxProps } from "@mui/system";
import { useEditProductionStepMutation } from "../../../store/Production";
import { useGetProductionArticlesDataQuery } from "../../../store/Data";

export type stepEditTypes = "title" | "content" | "order" | "productionArticle";

interface IStepDialogProps {
  step: IStepFull;
  edit: stepEditTypes;
}

const StepItemDialog = ({ step, edit }: IStepDialogProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { data } = useGetProductionArticlesDataQuery("");
  const articles = useMemo(
    () =>
      Array.isArray(data)
        ? data.filter((article) => article.content !== "")
        : [],
    [data]
  );
  const [editStep, { isLoading }] = useEditProductionStepMutation();
  const { handleSubmit, control } = useForm<ISendStep>();

  const handleEditStep = handleSubmit(async (data) => {
    try {
      const sendData = { id: step._id, data };
      const res = await editStep(sendData).unwrap();
      dispatch(showSuccessSnackbar(`Статья ${res.title} изменена`));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || "fail"));
    }
  });

  const validObj = () => {
    switch (edit) {
      case "productionArticle":
        return { required: "Выберите статью" };
      case "title":
        return { required: "Введите заголовок статьи" };
      case "content":
        return { required: "Напишите статью" };
      case "order":
        return {
          required: "Введите порядковый номер",
          pattern: {
            value: /^[0-9]*$/,
            message: "Только цифры",
          },
        };
      default:
        return undefined;
    }
  };

  return (
    <Container sx={styles.dialog}>
      <Box sx={styles.form} component="form">
        <Typography>Редактирование Статьи</Typography>

        {(edit === "title" || edit === "content" || edit === "order") && (
          <Controller
            name={edit}
            control={control}
            defaultValue={step[edit]}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                size="small"
                tabIndex={1}
                sx={styles.input}
                label={edit}
                fullWidth
                multiline={edit === "content"}
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

        {edit === "productionArticle" && (
          <Controller
            name="productionArticle"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                size="small"
                color={"warning"}
                tabIndex={2}
                sx={styles.input}
                label="Выберите Статью"
                fullWidth
                select
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              >
                <MenuItem dense value={undefined}></MenuItem>
                {articles?.map((article, i) => (
                  <MenuItem dense key={i} value={article._id}>
                    <ListItemText>{article.title}</ListItemText>
                  </MenuItem>
                )) || <p>wait...</p>}
              </TextField>
            )}
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
            onClick={handleEditStep}
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

export default memo(StepItemDialog);
