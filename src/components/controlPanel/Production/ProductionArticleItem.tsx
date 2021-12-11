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
import ProductionArticleItemDialog, {
  prodactionArticleEditTypes,
} from "./ProductionArticleItem.dialog";
import { useDeleteProductionArticleMutation } from "../../../store/Production";
import TextCellWithEdit from "../TextCellWithEdit";

interface IProductionArticleItemProps {
  productionArticle: IProductionArticleFull;
}

const ProductionArticleItem = ({
  productionArticle,
}: IProductionArticleItemProps) => {
  const [removeProductionArticle, { isLoading }] =
    useDeleteProductionArticleMutation();
  const dispatch = useAppDispatch();

  const handleDeleteProductionArticle = useCallback(async () => {
    try {
      const res = await removeProductionArticle(productionArticle._id).unwrap();
      dispatch(showSuccessSnackbar(res.message || "success"));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError).data.message || "fail"));
    }
  }, [dispatch, productionArticle, removeProductionArticle]);

  const openEditModal = useCallback(
    (edit: prodactionArticleEditTypes) =>
      dispatch(
        openModal(
          <ProductionArticleItemDialog
            productionArticle={productionArticle}
            edit={edit}
          />
        )
      ),
    [dispatch, productionArticle]
  );

  return (
    <TableRow>
      <TableCell>
        {productionArticle.author != null
          ? `${productionArticle.author.name}`
          : ""}
      </TableCell>

      <TableCell>
        <TextCellWithEdit<prodactionArticleEditTypes>
          val={productionArticle.title}
          openModal={openEditModal}
          edit="title"
        />
      </TableCell>

      <TableCell>
        <TextCellWithEdit<prodactionArticleEditTypes>
          val={productionArticle.content}
          openModal={openEditModal}
          edit="content"
        />
      </TableCell>

      <TableCell>
        <TextCellWithEdit<prodactionArticleEditTypes>
          val={productionArticle.order}
          openModal={openEditModal}
          edit="order"
        />
      </TableCell>

      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {str2rusDate(productionArticle.createdAt)}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {str2rusDate(productionArticle.updatedAt)}
      </TableCell>
      <TableCell align="right">
        <IconButton
          color="error"
          onClick={handleDeleteProductionArticle}
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

export default memo(ProductionArticleItem);
