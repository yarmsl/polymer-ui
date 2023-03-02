import { memo, useCallback } from 'react';

import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { Button, CircularProgress, IconButton, TableCell, TableRow, Tooltip } from '@mui/material';

import { str2rusDate } from '~/lib/Dates';
import { useAppDispatch } from '~/store';
import { openModal } from '~/store/ModalStack';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';

import TagItemDialog from './TagItem.dialog';
import { useDeleteTagMutation } from '../store';

interface ITagItemProps {
  tag: ITagFull;
}

const UserItem = ({ tag }: ITagItemProps) => {
  const [removeTag, { isLoading }] = useDeleteTagMutation();
  const dispatch = useAppDispatch();

  const handleDeleteUser = useCallback(async () => {
    try {
      const res = await removeTag(tag._id).unwrap();
      dispatch(showSuccessSnackbar(res.message || 'success'));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError).data.message || 'fail'));
    }
  }, [dispatch, removeTag, tag]);
  return (
    <TableRow>
      <TableCell>{tag.author != null ? tag.author.name : ''}</TableCell>
      <TableCell>
        <Tooltip title='Изменить' arrow>
          <Button
            color='info'
            size='small'
            onClick={() => dispatch(openModal(<TagItemDialog edit='name' tag={tag} />))}
          >
            {tag.name}
          </Button>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip title='Изменить' arrow>
          <Button
            color='info'
            size='small'
            onClick={() => dispatch(openModal(<TagItemDialog edit='slug' tag={tag} />))}
          >
            {tag.slug}
          </Button>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip title='Изменить' arrow>
          <Button
            color='info'
            size='small'
            onClick={() => dispatch(openModal(<TagItemDialog edit='order' tag={tag} />))}
          >
            {tag.order}
          </Button>
        </Tooltip>
      </TableCell>
      <TableCell>{str2rusDate(tag.createdAt)}</TableCell>
      <TableCell>{str2rusDate(tag.updatedAt)}</TableCell>
      <TableCell align='right'>
        <IconButton color='error' disabled={isLoading} onClick={() => handleDeleteUser()}>
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

export default memo(UserItem);
