import { memo, useCallback } from 'react';

import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { CircularProgress, IconButton, TableCell, TableRow } from '@mui/material';

import { str2rusDate } from '~/lib/Dates';
import { useAppDispatch } from '~/store';
import { openModal } from '~/store/ModalStack';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';
import TextCellWithEdit from '~/UI/atoms/TextCellWithEdit';

import VacancyItemDialog, { vacancyEditTypes } from './VacancyItem.dialog';
import { useDeleteVacancyMutation } from '../store';

interface IStoryItemProps {
  vacancy: IVacancyFull;
}

const VacancyItem = ({ vacancy }: IStoryItemProps) => {
  const [removeVacancy, { isLoading }] = useDeleteVacancyMutation();
  const dispatch = useAppDispatch();

  const handleDeleteVacancy = useCallback(async () => {
    try {
      const res = await removeVacancy(vacancy._id).unwrap();
      dispatch(showSuccessSnackbar(res.message || 'success'));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError).data.message || 'fail'));
    }
  }, [dispatch, removeVacancy, vacancy]);

  const openEditModal = useCallback(
    (edit: vacancyEditTypes) =>
      dispatch(openModal(<VacancyItemDialog edit={edit} vacancy={vacancy} />)),
    [dispatch, vacancy],
  );

  return (
    <TableRow>
      <TableCell>{vacancy.author != null ? `${vacancy.author.name}` : ''}</TableCell>

      <TableCell>
        <TextCellWithEdit<vacancyEditTypes>
          edit='title'
          openModal={openEditModal}
          val={vacancy.title}
        />
      </TableCell>

      <TableCell>
        <TextCellWithEdit<vacancyEditTypes>
          edit='requirements'
          openModal={openEditModal}
          val={vacancy.requirements}
        />
      </TableCell>

      <TableCell>
        <TextCellWithEdit<vacancyEditTypes>
          edit='wage'
          openModal={openEditModal}
          val={vacancy.wage}
        />
      </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{str2rusDate(vacancy.createdAt)}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{str2rusDate(vacancy.updatedAt)}</TableCell>
      <TableCell align='right'>
        <IconButton color='error' disabled={isLoading} onClick={handleDeleteVacancy}>
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

export default memo(VacancyItem);
