import {
  CircularProgress,
  IconButton,
  TableCell,
  TableRow,
} from "@mui/material";
import { memo, useCallback } from "react";
import { str2rusDate } from "../../../lib/Dates";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../../../store/Notifications";
import { openModal } from "../../../store/ModalStack";
import { useAppDispatch } from "../../../store";
import StoryItemDialog, { storyEditTypes } from "./StoryItem.dialog";
import { useDeleteStoryMutation } from "../../../store/Story";
import TextCellWithEdit from "../TextCellWithEdit";

interface IStoryItemProps {
  story: IStoryFull;
}

const StoryItem = ({ story }: IStoryItemProps) => {
  const [removeStory, { isLoading }] = useDeleteStoryMutation();
  const dispatch = useAppDispatch();

  const handleDeleteStory = useCallback(async () => {
    try {
      const res = await removeStory(story._id).unwrap();
      dispatch(showSuccessSnackbar(res.message || "success"));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError).data.message || "fail"));
    }
  }, [dispatch, removeStory, story._id]);

  const openEditModal = useCallback(
    (edit: storyEditTypes) =>
      dispatch(openModal(<StoryItemDialog story={story} edit={edit} />)),
    [dispatch, story]
  );

  return (
    <TableRow>
      <TableCell>
        {story.author != null ? `${story.author.name}` : ""}
      </TableCell>

      <TableCell>
        <TextCellWithEdit<storyEditTypes>
          val={story.from}
          openModal={openEditModal}
          edit="from"
        />
      </TableCell>

      <TableCell>
        <TextCellWithEdit<storyEditTypes>
          val={story.to}
          openModal={openEditModal}
          edit="to"
        />
      </TableCell>

      <TableCell>
        <TextCellWithEdit<storyEditTypes>
          val={story.content}
          openModal={openEditModal}
          edit="content"
        />
      </TableCell>

      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {str2rusDate(story.createdAt)}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {str2rusDate(story.updatedAt)}
      </TableCell>
      <TableCell align="right">
        <IconButton
          color="error"
          onClick={handleDeleteStory}
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

export default memo(StoryItem);
