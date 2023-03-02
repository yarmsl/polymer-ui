import { memo, useCallback } from 'react';

import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { CircularProgress, IconButton, TableCell, TableRow } from '@mui/material';

import { str2rusDate } from '~/lib/Dates';
import { useAppDispatch } from '~/store';
import { openModal } from '~/store/ModalStack';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';
import TextCellWithEdit from '~/UI/atoms/TextCellWithEdit';

import StoryArticleItemDialog, { storyArticleEditTypes } from './StoryArticleItem.dialog';
import { useDeleteStoryArticleMutation } from '../store';

interface IStoryItemProps {
  storyArticle: IStoryArticleFull;
}

const StoryArticleItem = ({ storyArticle }: IStoryItemProps) => {
  const [removeStoryArticle, { isLoading }] = useDeleteStoryArticleMutation();
  const dispatch = useAppDispatch();
  const handleDeleteStoryArticle = useCallback(async () => {
    try {
      const res = await removeStoryArticle(storyArticle._id).unwrap();
      dispatch(showSuccessSnackbar(res.message || 'success'));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError).data.message || 'fail'));
    }
  }, [dispatch, storyArticle, removeStoryArticle]);

  const openEditModal = useCallback(
    (edit: storyArticleEditTypes) =>
      dispatch(openModal(<StoryArticleItemDialog edit={edit} storyArticle={storyArticle} />)),
    [dispatch, storyArticle],
  );

  return (
    <TableRow>
      <TableCell>{storyArticle.author != null ? `${storyArticle.author.name}` : ''}</TableCell>

      <TableCell>
        <TextCellWithEdit<storyArticleEditTypes>
          edit='title'
          openModal={openEditModal}
          val={storyArticle.title}
        />
      </TableCell>

      <TableCell>
        <TextCellWithEdit<storyArticleEditTypes>
          edit='content'
          openModal={openEditModal}
          val={storyArticle.content}
        />
      </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{str2rusDate(storyArticle.createdAt)}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{str2rusDate(storyArticle.updatedAt)}</TableCell>
      <TableCell align='right'>
        <IconButton color='error' disabled={isLoading} onClick={handleDeleteStoryArticle}>
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

export default memo(StoryArticleItem);
