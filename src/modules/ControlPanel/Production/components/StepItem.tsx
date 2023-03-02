import { memo, useCallback, useMemo } from 'react';

import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { Box, CircularProgress, IconButton, TableCell, TableRow } from '@mui/material';

import { SERVER_URL } from '~/lib/constants';
import { str2rusDate } from '~/lib/Dates';
import { useAppDispatch } from '~/store';
import { useGetProductionArticlesDataQuery } from '~/store/Data';
import { openModal } from '~/store/ModalStack';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';
import TextCellWithEdit from '~/UI/atoms/TextCellWithEdit';

import ProjectItemDialog, { stepEditTypes } from './StepItem.dialog';
import { useDeleteProductionStepMutation } from '../store';

interface IStepItemProps {
  step: IStepFull;
}

const StepItem = ({ step }: IStepItemProps) => {
  const { data } = useGetProductionArticlesDataQuery('');
  const articleTitle = useMemo(
    () =>
      Array.isArray(data)
        ? data.find((article) => article._id === step.productionArticle)?.title || ''
        : '',
    [data, step.productionArticle],
  );
  const [removeStep, { isLoading }] = useDeleteProductionStepMutation();
  const dispatch = useAppDispatch();

  const handleDeleteStep = useCallback(async () => {
    try {
      const res = await removeStep(step._id).unwrap();
      dispatch(showSuccessSnackbar(res.message || 'success'));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError).data.message || 'fail'));
    }
  }, [dispatch, removeStep, step]);

  const openEditModal = useCallback(
    (edit: stepEditTypes) => dispatch(openModal(<ProjectItemDialog edit={edit} step={step} />)),
    [dispatch, step],
  );

  return (
    <TableRow>
      <TableCell>{step.author != null ? `${step.author.name}` : ''}</TableCell>
      <TableCell>
        <Box sx={styles.img}>
          <img alt='Подстатья' src={`${SERVER_URL}/${step.image}`} />
        </Box>
      </TableCell>
      <TableCell>
        <TextCellWithEdit<stepEditTypes>
          edit='productionArticle'
          openModal={openEditModal}
          val={articleTitle}
        />
      </TableCell>
      <TableCell>
        <TextCellWithEdit<stepEditTypes> edit='title' openModal={openEditModal} val={step.title} />
      </TableCell>
      <TableCell>
        <TextCellWithEdit<stepEditTypes>
          edit='content'
          openModal={openEditModal}
          val={step.content}
        />
      </TableCell>
      <TableCell>
        <TextCellWithEdit<stepEditTypes> edit='order' openModal={openEditModal} val={step.order} />
      </TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{str2rusDate(step.createdAt)}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{str2rusDate(step.updatedAt)}</TableCell>
      <TableCell align='right'>
        <IconButton color='error' disabled={isLoading} onClick={handleDeleteStep}>
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

const styles: TStyles = {
  img: {
    width: 'calc(100% - 36px)',
    minWidth: '80px',
    maxWidth: '120px',
    '& img': {
      width: '100%',
      objectFit: 'contain',
      objectPosition: 'center',
    },
  },
};

export default memo(StepItem);
