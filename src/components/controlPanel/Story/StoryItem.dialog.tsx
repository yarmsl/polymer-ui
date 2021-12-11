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
import { useEditStoryMutation } from "../../../store/Story";

export type storyEditTypes = "from" | "content" | "to";

interface IStoryDialogProps {
  story: IStoryFull;
  edit: storyEditTypes;
}

const StoryItemDialog = ({ story, edit }: IStoryDialogProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [editStory, { isLoading }] = useEditStoryMutation();
  const { handleSubmit, control } = useForm<ISendStory>();

  const handleEditStory = handleSubmit(async (data) => {
    try {
      const sendData = { id: story._id, data };
      const res = await editStory(sendData).unwrap();
      dispatch(showSuccessSnackbar(`История ${res.from} изменена`));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || "fail"));
    }
  });

  const validObj = () => {
    switch (edit) {
      case "content":
        return { required: "Напишите историю" };
      case "from":
        return {
          required: "Введите год",
          pattern: {
            value: /^[0-9]*$/,
            message: "Только цифры",
          },
        };
      case "to":
        return {
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
        <Typography>Редактирование Истории</Typography>

        {(edit === "from" || edit === "content" || edit === "to") && (
          <Controller
            name={edit}
            control={control}
            defaultValue={story[edit]}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                size="small"
                tabIndex={1}
                sx={styles.input}
                label={edit}
                fullWidth
                multiline={edit === "content"}
                minRows={3}
                maxRows={8}
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
            onClick={handleEditStory}
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
    width: "300px",
    "&>*:not(:last-child)": {
      mb: "12px",
    },
  },
  input: {
    minHeight: "60px",
  },
};

export default memo(StoryItemDialog);
