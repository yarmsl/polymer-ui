import {
  Button,
  CircularProgress,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import { memo, useCallback } from "react";
import { str2rusDate } from "../../lib/Dates";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../../store/Notifications";
import { openModal } from "../../store/ModalStack";
import { useAppDispatch } from "../../store";
import { useDeleteTagMutation } from "../../store/Tag";
import { SxProps } from "@mui/system";
import TagItemDialog from "./TagItem.dialog";

interface ITagItemProps {
  tag: ITagFull;
}

const UserItem = ({ tag }: ITagItemProps) => {
  const [removeTag, { isLoading }] = useDeleteTagMutation();
  const dispatch = useAppDispatch();

  const handleDeleteUser = useCallback(async () => {
    try {
      const res = await removeTag(tag._id).unwrap();
      dispatch(showSuccessSnackbar(res.message || "success"));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError).data.message || "fail"));
    }
  }, [dispatch, removeTag, tag]);
  return (
    <TableRow>
      <TableCell>
        {tag.author != null ? `${tag.author.name} <${tag.author.email}>` : ""}
      </TableCell>
      <TableCell sx={styles.long}>
        {tag.projects.length > 0
          ? tag.projects.map((proj) => proj.title).join(", ")
          : ""}
      </TableCell>
      <TableCell>
        <Tooltip arrow title="Изменить">
          <Button
            size="small"
            color="info"
            onClick={() =>
              dispatch(openModal(<TagItemDialog tag={tag} edit="name" />))
            }
          >
            {tag.name}
          </Button>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip arrow title="Изменить">
          <Button
            size="small"
            color="info"
            onClick={() =>
              dispatch(openModal(<TagItemDialog tag={tag} edit="slug" />))
            }
          >
            {tag.slug}
          </Button>
        </Tooltip>
      </TableCell>
      <TableCell>{str2rusDate(tag.createdAt)}</TableCell>
      <TableCell>{str2rusDate(tag.updatedAt)}</TableCell>
      <TableCell align="right">
        <IconButton
          color="error"
          onClick={() => handleDeleteUser()}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress color="inherit" size={20} />
          ) : (
            <DeleteForeverRoundedIcon />
          )}
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

const styles: Record<string, SxProps> = {
  long: {
    maxWidth: "250px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordBreak: "break-all",
    whiteSpace: "nowrap",
  },
};

export default memo(UserItem);
