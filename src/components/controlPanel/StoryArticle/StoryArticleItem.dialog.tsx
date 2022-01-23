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
import { useEditStoryArticleMutation } from "../../../store/StoryArticle";

export type storyArticleEditTypes = "title" | "content";

interface IStoryArticleDialogProps {
  storyArticle: IStoryArticleFull;
  edit: storyArticleEditTypes;
}

const StoryArticleItemDialog = ({
  storyArticle,
  edit,
}: IStoryArticleDialogProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [editStoryArticle, { isLoading }] = useEditStoryArticleMutation();
  const { handleSubmit, control } = useForm<ISendStoryArticle>();

  const handleEditStoryArticle = handleSubmit(async (data) => {
    try {
      const sendData = { id: storyArticle._id, data };
      const res = await editStoryArticle(sendData).unwrap();
      dispatch(showSuccessSnackbar(`Статья ${res.title} изменена`));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || "fail"));
    }
  });

  const validObj = () => {
    switch (edit) {
      case "title":
        return { required: "Введите заголовок" };
      case "content":
        return { required: "Напишите статью" };
      default:
        return undefined;
    }
  };

  return (
    <Container sx={styles.dialog}>
      <Box sx={styles.form} component="form">
        <Typography>Редактирование Статьи</Typography>

        {(edit === "title" || edit === "content") && (
          <Controller
            name={edit}
            control={control}
            defaultValue={storyArticle[edit]}
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
            onClick={handleEditStoryArticle}
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

export default memo(StoryArticleItemDialog);
