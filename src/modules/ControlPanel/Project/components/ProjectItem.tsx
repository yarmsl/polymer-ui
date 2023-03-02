import { memo, useCallback } from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Box, CircularProgress, IconButton, TableCell, TableRow, Tooltip } from '@mui/material';

import { SERVER_URL } from '~/lib/constants';
import { str2rusDate } from '~/lib/Dates';
import { useAppDispatch } from '~/store';
import { openModal } from '~/store/ModalStack';
import { showErrorSnackbar, showSuccessSnackbar } from '~/store/Notifications';
import TextCellWithEdit from '~/UI/atoms/TextCellWithEdit';

import ProjectItemDialog, { projEditTypes } from './ProjectItem.dialog';
import { useDeleteProjectMutation } from '../store';

interface IImgCellWithEditProps {
  val: string | number;
  imgPath: string;
  openModal: (edit: projEditTypes) => void;
  edit: projEditTypes;
}
interface IProjectItemProps {
  project: IProjectFull;
}

const ImgCellWithEdit = ({ val, imgPath, openModal, edit }: IImgCellWithEditProps): JSX.Element => (
  <Box sx={styles.textCell}>
    <Tooltip title={val} arrow>
      <Box sx={styles.img}>
        <img alt={`${val}`} src={`${SERVER_URL}/${imgPath}`} />
      </Box>
    </Tooltip>
    <IconButton size='small' onClick={() => openModal(edit)}>
      <EditRoundedIcon color='warning' fontSize='inherit' />
    </IconButton>
  </Box>
);

const ProjectItem = ({ project }: IProjectItemProps) => {
  const [removeProject, { isLoading }] = useDeleteProjectMutation();
  const dispatch = useAppDispatch();

  const handleDeleteProject = useCallback(async () => {
    try {
      const res = await removeProject(project._id).unwrap();
      dispatch(showSuccessSnackbar(res.message || 'success'));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError).data.message || 'fail'));
    }
  }, [removeProject, project, dispatch]);

  const openEditModal = useCallback(
    (edit: projEditTypes) =>
      dispatch(openModal(<ProjectItemDialog edit={edit} project={project} />)),
    [dispatch, project],
  );

  return (
    <TableRow>
      <TableCell>{project.author != null ? `${project.author.name}` : ''}</TableCell>
      <TableCell>
        <TextCellWithEdit<projEditTypes>
          edit='title'
          openModal={openEditModal}
          val={project.title}
        />
      </TableCell>
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
        <TextCellWithEdit<projEditTypes>
          edit='tags'
          openModal={openEditModal}
          val={project.tags?.map((tag) => tag.name) || []}
        />
      </TableCell>

      <TableCell>
        <ImgCellWithEdit
          edit='customer'
          imgPath={project.customer?.logo || ''}
          openModal={openEditModal}
          val={project.customer?.name || ''}
        />
      </TableCell>
      <TableCell>
        <TextCellWithEdit<projEditTypes> edit='done' openModal={openEditModal} val={project.done} />
      </TableCell>
      <TableCell>
        <TextCellWithEdit<projEditTypes> edit='year' openModal={openEditModal} val={project.year} />
      </TableCell>
      <TableCell>
        <TextCellWithEdit<projEditTypes> edit='slug' openModal={openEditModal} val={project.slug} />
      </TableCell>
      <TableCell>
        <TextCellWithEdit<projEditTypes>
          edit='order'
          openModal={openEditModal}
          val={project.order}
        />
      </TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{str2rusDate(project.createdAt)}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{str2rusDate(project.updatedAt)}</TableCell>
      <TableCell align='right'>
        <IconButton color='error' disabled={isLoading} onClick={handleDeleteProject}>
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
  textCell: {
    maxWidth: '150px',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    width: 'calc(100% - 36px)',
    minWidth: '80px',
    mr: '8px',
    '&:hover': {
      cursor: 'pointer',
    },
    '& img': {
      width: '100%',
      objectFit: 'contain',
      objectPosition: 'center',
    },
  },
};

export default memo(ProjectItem);
