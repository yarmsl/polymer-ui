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
import StoryArticleItemDialog, {
  storyArticleEditTypes,
} from "./StoryArticleItem.dialog";
import { useDeleteStoryArticleMutation } from "../../../store/StoryArticle";
import TextCellWithEdit from "../TextCellWithEdit";

interface IStoryItemProps {
  storyArticle: IStoryArticleFull;
}

const StoryArticleItem = ({ storyArticle }: IStoryItemProps) => {
  const [removeStoryArticle, { isLoading }] = useDeleteStoryArticleMutation();
  const dispatch = useAppDispatch();
  const handleDeleteStoryArticle = useCallback(async () => {
    try {
      const res = await removeStoryArticle(storyArticle._id).unwrap();
      dispatch(showSuccessSnackbar(res.message || "success"));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError).data.message || "fail"));
    }
  }, [dispatch, storyArticle, removeStoryArticle]);

  const openEditModal = useCallback(
    (edit: storyArticleEditTypes) =>
      dispatch(
        openModal(
          <StoryArticleItemDialog storyArticle={storyArticle} edit={edit} />
        )
      ),
    [dispatch, storyArticle]
  );

  return (
    <TableRow>
      <TableCell>
        {storyArticle.author != null ? `${storyArticle.author.name}` : ""}
      </TableCell>

      <TableCell>
        <TextCellWithEdit<storyArticleEditTypes>
          val={storyArticle.title}
          openModal={openEditModal}
          edit="title"
        />
      </TableCell>

      <TableCell>
        <TextCellWithEdit<storyArticleEditTypes>
          val={storyArticle.content}
          openModal={openEditModal}
          edit="content"
        />
      </TableCell>

      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {str2rusDate(storyArticle.createdAt)}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {str2rusDate(storyArticle.updatedAt)}
      </TableCell>
      <TableCell align="right">
        <IconButton
          color="error"
          onClick={handleDeleteStoryArticle}
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

export default memo(StoryArticleItem);
