import { memo, useCallback } from 'react';

import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { CircularProgress, IconButton, TableCell, TableRow } from '@mui/material';

import { str2rusDate } from '~/lib/Dates';
import { useAppDispatch } from '~/store';
import { openModal } from '~/store/ModalStack';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';
import TextCellWithEdit from '~/UI/atoms/TextCellWithEdit';

import StoryItemDialog, { storyEditTypes } from '../components/StoryItem.dialog';
import { useDeleteStoryMutation } from '../store';

interface IStoryItemProps {
  story: IStoryFull;
}

const StoryItem = ({ story }: IStoryItemProps) => {
  const [removeStory, { isLoading }] = useDeleteStoryMutation();
  const dispatch = useAppDispatch();

  const handleDeleteStory = useCallback(async () => {
    try {
      const res = await removeStory(story._id).unwrap();
      dispatch(showSuccessSnackbar(res.message || 'success'));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError).data.message || 'fail'));
    }
  }, [dispatch, removeStory, story._id]);

  const openEditModal = useCallback(
    (edit: storyEditTypes) => dispatch(openModal(<StoryItemDialog edit={edit} story={story} />)),
    [dispatch, story],
  );

  return (
    <TableRow>
      <TableCell>{story.author != null ? `${story.author.name}` : ''}</TableCell>

      <TableCell>
        <TextCellWithEdit<storyEditTypes> edit='from' openModal={openEditModal} val={story.from} />
      </TableCell>

      <TableCell>
        <TextCellWithEdit<storyEditTypes> edit='to' openModal={openEditModal} val={story.to} />
      </TableCell>

      <TableCell>
        <TextCellWithEdit<storyEditTypes>
          edit='content'
          openModal={openEditModal}
          val={story.content}
        />
      </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{str2rusDate(story.createdAt)}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{str2rusDate(story.updatedAt)}</TableCell>
      <TableCell align='right'>
        <IconButton color='error' disabled={isLoading} onClick={handleDeleteStory}>
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

export default memo(StoryItem);
