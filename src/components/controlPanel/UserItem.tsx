import { CircularProgress, IconButton, TableCell, TableRow } from "@mui/material"
import { memo, useCallback } from "react"
import { str2rusDate } from "../../lib/Dates"
import UserItemDialog from "./UserItem.dialog"
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useRemoveUserMutation } from "../../store/Users";
import { showErrorSnackbar, showSuccessSnackbar } from "../../store/Notifications";
import { openModal } from "../../store/ModalStack";
import { useAppDispatch } from "../../store";

interface IUserItemProps {
    user: IUserResponse;
  }

const UserItem = ({user}: IUserItemProps) => {
    const [removeUser, { isLoading: deleteLoading }] = useRemoveUserMutation();
    const dispatch = useAppDispatch();
    const handleDeleteUser = useCallback(
        async () => {
          try {
            const res = await removeUser({ id: user.id }).unwrap();
            dispatch(showSuccessSnackbar(res.message || "success"));
          } catch (e) {
            dispatch(showErrorSnackbar((e as IQueryError).data.message || "fail"));
          }
        },
        [dispatch, removeUser, user]
      );
    return (<TableRow>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell>{str2rusDate(user.createdAt)}</TableCell>
        <TableCell>{str2rusDate(user.updatedAt)}</TableCell>
        <TableCell align="right">
          <IconButton
            disabled={user.role === "dev"}
            color="warning"
            onClick={() =>
              dispatch(openModal(<UserItemDialog user={user} />))
            }
          >
            <EditRoundedIcon />
          </IconButton>
        </TableCell>
        <TableCell align="right">
          <IconButton
            color="error"
            onClick={() => handleDeleteUser()}
            disabled={deleteLoading || user.role !== "user"}
          >
            {deleteLoading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              <DeleteForeverRoundedIcon />
            )}
          </IconButton>
        </TableCell>
      </TableRow>)
}

export default memo(UserItem)