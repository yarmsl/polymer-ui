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
import { useAppDispatch } from "../../store";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../../store/Notifications";
import { closeModalAction } from "../../store/ModalStack";
import { SxProps } from "@mui/system";
import { useEditTagMutation } from "../../store/Tag";

interface ITagItemDialogProps {
  tag: ITagFull;
  edit: "name" | "slug";
}

const TagItemDialog = ({ tag, edit }: ITagItemDialogProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [editTag, { isLoading }] = useEditTagMutation();
  const { handleSubmit, control } = useForm<IEditTagData>();

  const handleEditTag = handleSubmit(async (data) => {
    try {
      const sendData = { id: tag._id, data };
      const res = await editTag(sendData).unwrap();
      dispatch(showSuccessSnackbar(`Тег ${res.name} успешно изменён`));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || "fail"));
    }
  });
  return (
    <Container sx={styles.dialog}>
      <Box sx={styles.form} component="form">
        <Typography>Редактирование тега</Typography>
        {edit === "name" && (
          <Controller
            name="name"
            control={control}
            defaultValue={tag.name}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                size="small"
                tabIndex={1}
                sx={styles.input}
                label="Тег"
                fullWidth
                type="text"
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
        )}
        {edit === "slug" && (
          <Controller
            name="slug"
            control={control}
            defaultValue={tag.slug}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                size="small"
                tabIndex={2}
                sx={styles.input}
                label="URL slug"
                fullWidth
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
            onClick={handleEditTag}
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
    width: '300px',
    "&>*:not(:last-child)": {
        mb: '12px'
    }
  },
  input: {
    height: "60px",
  },
};

export default memo(TagItemDialog);
