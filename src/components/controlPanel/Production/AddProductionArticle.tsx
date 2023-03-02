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

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../../../store/Notifications";
import { useAddProductionArticleMutation } from "../../../store/Production";

const AddProductionArticle = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { handleSubmit, control, reset } = useForm<IAddProductionArticle>({
    defaultValues: {
      title: "",
      content: "",
      order: "" as unknown as number,
    },
  });
  const [newProdArticle, { isLoading }] = useAddProductionArticleMutation();

  const handleNewProdArticle = handleSubmit(async (data) => {
    try {
      const res = await newProdArticle(data).unwrap();
      dispatch(showSuccessSnackbar(`Статья ${res.title} опубликована`));
      reset();
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || "fail"));
    }
  });

  return (
    <Container maxWidth={"xs"}>
      <Box sx={styles.form} component="form">
        <Typography align="center" variant="h6" sx={{ mb: "12px" }}>
          Новая статья на странице Производство
        </Typography>
        <Typography align="justify" variant="subtitle2" sx={{ mb: "12px" }}>
          Внимание! Отправив Заголовок без статьи вы создадите Заголовок первого
          уровня на странице Производство, он как и любая статься отобразится в
          соответствии с порядковым номером
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
              label="Заголовок"
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
            required: "Введите заголовок статьи",
          }}
        />

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
              sx={styles.field}
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
              label="Порядковый номер статьи"
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

        <Button
          variant="contained"
          color="success"
          disabled={isLoading}
          onClick={handleNewProdArticle}
          endIcon={
            isLoading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              <AddRoundedIcon />
            )
          }
        >
          Опубликовать
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
      mb: "6px!important",
    },
  },
  input: {
    minHeight: "68px",
    mt: "16px",
  },
  field: {
    minHeight: "120px",
  },
};

export default AddProductionArticle;
