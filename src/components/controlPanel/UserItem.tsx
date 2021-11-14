import {
  Box,
  Button,
  Container,
  Dialog,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { memo, useState } from "react";
import {
  useEditUserByIdMutation,
  useRemoveUserMutation,
} from "../../store/Users";
import { useForm, Controller } from "react-hook-form";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { useAppDispatch } from "../../store";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../../store/Notifications";

interface IUserIterProps {
  user: IUserResponse;
}

const UserItem = ({ user }: IUserIterProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [removeUser, { isLoading: deleteLoading }] = useRemoveUserMutation();
  const [editUser, { isLoading: editLoading }] = useEditUserByIdMutation();
  const { handleSubmit, control } = useForm<IEditUser>();

  const handleDeleteUser = async () => {
    try {
      const res = await removeUser({ id: user.id }).unwrap();
      dispatch(showSuccessSnackbar(res.message || "success"));
    } catch (e) {
      dispatch(
        showErrorSnackbar((e as IQueryError).data.message || "fail")
      );
    }
  };

  const handleEditUser = handleSubmit(async (data) => {
    try {
      const sendData = { id: user.id, ...data };
      const res = await editUser(sendData).unwrap();
      dispatch(showSuccessSnackbar(res.message || "success"));
      setOpen(false);
    } catch (e) {
      dispatch(
        showErrorSnackbar((e as IQueryError).data.message || "fail")
      );
    }
  });

  return (
    <>
      <Box sx={styles.root}>
        <Typography>Имя: {user.name}</Typography>
        <Typography>Email: {user.email}</Typography>
        <Box sx={styles.credits}>
          <Typography
            color={user.role === "admin" ? "mediumvioletred" : "teal"}
          >
            Уровень прав: {user.role}
          </Typography>
          <Typography variant="subtitle2">
            Создан{" "}
            {new Date(user.created_on).toLocaleString("ru", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        </Box>
        <Box sx={styles.actions}>
          <Button
            variant="contained"
            onClick={handleDeleteUser}
            disabled={deleteLoading}
            endIcon={<DeleteForeverRoundedIcon />}
          >
            Удалить
          </Button>
          <Button
            variant="contained"
            color="warning"
            endIcon={<EditRoundedIcon />}
            onClick={() => setOpen((p) => !p)}
          >
            Редактировать
          </Button>
        </Box>
      </Box>
      <Dialog open={open} onClose={() => setOpen((p) => !p)}>
        <Container sx={styles.dialog} maxWidth={"xs"}>
          <Typography>Редактирование пользователя {user.email}</Typography>
          <Box sx={styles.form} component="form">
            <Controller
              name="name"
              control={control}
              defaultValue={user.name}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
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
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  tabIndex={2}
                  sx={styles.input}
                  label="Уровень прав"
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
                required: "Выбирите уровень прав доступа",
              }}
            />
            <Typography variant="subtitle2">
              * уровень прав admin позволяет добавлять, редактировать и удалять
              пользователей
            </Typography>
            <Box sx={styles.actions}>
              <Button
                variant="contained"
                color="success"
                endIcon={<SaveRoundedIcon />}
                onClick={handleEditUser}
                disabled={editLoading}
              >
                Сохранить
              </Button>
              <Button variant="contained" onClick={() => setOpen((p) => !p)}>
                Закрыть
              </Button>
            </Box>
          </Box>
        </Container>
      </Dialog>
    </>
  );
};

const styles = {
  root: {
    width: "100%",
    padding: "8px 0",
  },
  credits: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  } as const,
  actions: {
    width: "100%",
    mt: "8px",
    display: "flex",
    justifyContent: "space-evenly",
  } as const,
  dialog: {
    width: "100%",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&>*:not(:last-child)": {
      mb: "15px",
    },
  } as const,
  form: {
    "&>*:not(:last-child)": {
      mb: "15px",
    },
  },
  input: {
    height: "82px",
  },
};

export default memo(UserItem);
