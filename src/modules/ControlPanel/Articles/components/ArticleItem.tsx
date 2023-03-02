import { memo, useCallback } from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Box, CircularProgress, IconButton, TableCell, TableRow } from '@mui/material';

import { str2rusDate } from '~/lib/Dates';
import { useAppDispatch } from '~/store';
import { openModal } from '~/store/ModalStack';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';
import TextCellWithEdit from '~/UI/atoms/TextCellWithEdit';

import ArticleItemDialog, { articleEditTypes } from './ArticleItem.dialog';
import { useDeleteArticleMutation } from '../store';

interface IArticleItemProps {
  article: IArticleFull;
}

const ArticleItem = ({ article }: IArticleItemProps) => {
  const [removeArticle, { isLoading }] = useDeleteArticleMutation();
  const dispatch = useAppDispatch();

  const handleDeleteArticle = useCallback(async () => {
    try {
      const res = await removeArticle(article._id).unwrap();
      dispatch(showSuccessSnackbar(res.message || 'success'));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError).data.message || 'fail'));
    }
  }, [article, dispatch, removeArticle]);

  const openEditModal = useCallback(
    (edit: articleEditTypes) =>
      dispatch(openModal(<ArticleItemDialog article={article} edit={edit} />)),
    [article, dispatch],
  );

  return (
    <TableRow>
      <TableCell>{article.author != null ? `${article.author.name}` : ''}</TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', '&>*': { m: '0 4px' } }}>
          <IconButton size='small' onClick={() => openEditModal('addImgs')}>
            <CloudUploadIcon color='info' fontSize='inherit' />
          </IconButton>
          <IconButton size='small' onClick={() => openEditModal('editImgs')}>
            <EditRoundedIcon color='warning' fontSize='inherit' />
          </IconButton>
        </Box>
      </TableCell>

      <TableCell>
        <TextCellWithEdit<articleEditTypes>
          edit='title'
          openModal={openEditModal}
          val={article.title}
        />
      </TableCell>
      <TableCell>
        <TextCellWithEdit<articleEditTypes>
          edit='content'
          openModal={openEditModal}
          val={article.content}
        />
      </TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{str2rusDate(article.createdAt)}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{str2rusDate(article.updatedAt)}</TableCell>
      <TableCell align='right'>
        <IconButton color='error' disabled={isLoading} onClick={handleDeleteArticle}>
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

export default memo(ArticleItem);
