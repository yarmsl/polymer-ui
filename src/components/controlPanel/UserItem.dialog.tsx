import {
  Box,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { memo } from "react";
import { useAppDispatch } from "../../store";
import { useEditUserByIdMutation } from "../../store/Users";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../../store/Notifications";
import { closeModalAction } from "../../store/ModalStack";
import { SxProps } from "@mui/system";

interface IUserItemDialogProps {
  user: IUserResponse;
}

const UserItemDialog = ({ user }: IUserItemDialogProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [editUser, { isLoading: editLoading }] = useEditUserByIdMutation();
  const { handleSubmit, control } = useForm<IEditUser>();
  const handleEditUser = handleSubmit(async (data) => {
    try {
      const sendData = { id: user.id, ...data };
      const res = await editUser(sendData).unwrap();
      dispatch(showSuccessSnackbar(res.message || "success"));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError)?.data?.message || "fail"));
    }
  });
  return (
    <Container sx={styles.dialog} maxWidth={"xs"}>
      <Typography>Редактирование пользователя</Typography>
      <Typography variant="h6" color="teal">
        {user.email}
      </Typography>
      <Box sx={styles.form} component="form">
        <Controller
          name="name"
          control={control}
          defaultValue={user.name}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              tabIndex={1}
              sx={styles.input}
              label="Имя"
              fullWidth
              type="text"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          rules={{
            required: "Введите имя",
          }}
        />
        <Controller
          name="role"
          control={control}
          defaultValue={user.role}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              tabIndex={2}
              sx={styles.input}
              label="Уровень доступа"
              fullWidth
              select
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            >
              <MenuItem value="admin">admin</MenuItem>
              <MenuItem value="user">user</MenuItem>
            </TextField>
          )}
          rules={{
            required: "Выбирите уровень доступа",
          }}
        />
        <Typography variant="subtitle2">
          * уровень доступа admin позволяет добавлять, редактировать и удалять
          пользователей
        </Typography>
        <Box sx={styles.actions}>
          <Button
            variant="contained"
            color="success"
            endIcon={
              editLoading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                <SaveRoundedIcon />
              )
            }
            onClick={handleEditUser}
            disabled={editLoading}
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
    mt: "8px",
    display: "flex",
    justifyContent: "space-evenly",
  },
  dialog: {
    width: "100%",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&>*:not(:last-child)": {
      mb: "15px",
    },
  },
  form: {
    "&>*:not(:last-child)": {
      mr: "15px",
    },
  },
  input: {
    height: "82px",
  },
};

export default memo(UserItemDialog);
