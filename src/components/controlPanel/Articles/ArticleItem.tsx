import {
  Box,
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
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArticleItemDialog, { articleEditTypes } from "./ArticleItem.dialog";
import { useDeleteArticleMutation } from "../../../store/Article";
import TextCellWithEdit from "../TextCellWithEdit";

interface IArticleItemProps {
  article: IArticleFull;
}

const ArticleItem = ({ article }: IArticleItemProps) => {
  const [removeArticle, { isLoading }] = useDeleteArticleMutation();
  const dispatch = useAppDispatch();

  const handleDeleteArticle = useCallback(async () => {
    try {
      const res = await removeArticle(article._id).unwrap();
      dispatch(showSuccessSnackbar(res.message || "success"));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError).data.message || "fail"));
    }
  }, [article, dispatch, removeArticle]);

  const openEditModal = useCallback(
    (edit: articleEditTypes) =>
      dispatch(openModal(<ArticleItemDialog article={article} edit={edit} />)),
    [article, dispatch]
  );

  return (
    <TableRow>
      <TableCell>
        {article.author != null ? `${article.author.name}` : ""}
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", "&>*": { m: "0 4px" } }}>
          <IconButton onClick={() => openEditModal("addImgs")} size="small">
            <CloudUploadIcon fontSize="inherit" color="info" />
          </IconButton>
          <IconButton onClick={() => openEditModal("editImgs")} size="small">
            <EditRoundedIcon fontSize="inherit" color="warning" />
          </IconButton>
        </Box>
      </TableCell>

      <TableCell>
        <TextCellWithEdit<articleEditTypes>
          val={article.title}
          openModal={openEditModal}
          edit="title"
        />
      </TableCell>
      <TableCell>
        <TextCellWithEdit<articleEditTypes>
          val={article.content}
          openModal={openEditModal}
          edit="content"
        />
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {str2rusDate(article.createdAt)}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {str2rusDate(article.updatedAt)}
      </TableCell>
      <TableCell align="right">
        <IconButton
          color="error"
          onClick={handleDeleteArticle}
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

export default memo(ArticleItem);
