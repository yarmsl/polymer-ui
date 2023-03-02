import { memo, useCallback } from 'react';

import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { CircularProgress, IconButton, TableCell, TableRow } from '@mui/material';

import { str2rusDate } from '~/lib/Dates';
import { useAppDispatch } from '~/store';
import { openModal } from '~/store/ModalStack';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';
import TextCellWithEdit from '~/UI/atoms/TextCellWithEdit';

import ProductionArticleItemDialog, {
  prodactionArticleEditTypes,
} from './ProductionArticleItem.dialog';
import { useDeleteProductionArticleMutation } from '../store';

interface IProductionArticleItemProps {
  productionArticle: IProductionArticleFull;
}

const ProductionArticleItem = ({ productionArticle }: IProductionArticleItemProps) => {
  const [removeProductionArticle, { isLoading }] = useDeleteProductionArticleMutation();
  const dispatch = useAppDispatch();

  const handleDeleteProductionArticle = useCallback(async () => {
    try {
      const res = await removeProductionArticle(productionArticle._id).unwrap();
      dispatch(showSuccessSnackbar(res.message || 'success'));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError).data.message || 'fail'));
    }
  }, [dispatch, productionArticle, removeProductionArticle]);

  const openEditModal = useCallback(
    (edit: prodactionArticleEditTypes) =>
      dispatch(
        openModal(
          <ProductionArticleItemDialog edit={edit} productionArticle={productionArticle} />,
        ),
      ),
    [dispatch, productionArticle],
  );

  return (
    <TableRow>
      <TableCell>
        {productionArticle.author != null ? `${productionArticle.author.name}` : ''}
      </TableCell>

      <TableCell>
        <TextCellWithEdit<prodactionArticleEditTypes>
          edit='title'
          openModal={openEditModal}
          val={productionArticle.title}
        />
      </TableCell>

      <TableCell>
        <TextCellWithEdit<prodactionArticleEditTypes>
          edit='content'
          openModal={openEditModal}
          val={productionArticle.content}
        />
      </TableCell>

      <TableCell>
        <TextCellWithEdit<prodactionArticleEditTypes>
          edit='order'
          openModal={openEditModal}
          val={productionArticle.order}
        />
      </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        {str2rusDate(productionArticle.createdAt)}
      </TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        {str2rusDate(productionArticle.updatedAt)}
      </TableCell>
      <TableCell align='right'>
        <IconButton color='error' disabled={isLoading} onClick={handleDeleteProductionArticle}>
          {isLoading ? (
            <CircularProgress color='inherit' size={20} />
          ) : (
            <DeleteForeverRoundedIcon />
          )}
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default memo(ProductionArticleItem);
