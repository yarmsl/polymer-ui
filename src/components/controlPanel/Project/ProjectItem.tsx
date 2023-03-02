import {
  Box,
  CircularProgress,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
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
import { SERVER_URL } from "../../../lib/constants";
import { useDeleteProjectMutation } from "../../../store/Project";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ProjectItemDialog, { projEditTypes } from "./ProjectItem.dialog";
import TextCellWithEdit from "../TextCellWithEdit";

interface IImgCellWithEditProps {
  val: string | number;
  imgPath: string;
  openModal: (edit: projEditTypes) => void;
  edit: projEditTypes;
}
interface IProjectItemProps {
  project: IProjectFull;
}

const ImgCellWithEdit = ({
  val,
  imgPath,
  openModal,
  edit,
}: IImgCellWithEditProps): JSX.Element => (
  <Box sx={styles.textCell}>
    <Tooltip arrow title={val}>
      <Box sx={styles.img}>
        <img src={`${SERVER_URL}/${imgPath}`} alt={`${val}`} />
      </Box>
    </Tooltip>
    <IconButton onClick={() => openModal(edit)} size="small">
      <EditRoundedIcon fontSize="inherit" color="warning" />
    </IconButton>
  </Box>
);

const ProjectItem = ({ project }: IProjectItemProps) => {
  const [removeProject, { isLoading }] = useDeleteProjectMutation();
  const dispatch = useAppDispatch();

  const handleDeleteProject = useCallback(async () => {
    try {
      const res = await removeProject(project._id).unwrap();
      dispatch(showSuccessSnackbar(res.message || "success"));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError).data.message || "fail"));
    }
  }, [removeProject, project, dispatch]);

  const openEditModal = useCallback(
    (edit: projEditTypes) =>
      dispatch(openModal(<ProjectItemDialog project={project} edit={edit} />)),
    [dispatch, project]
  );

  return (
    <TableRow>
      <TableCell>
        {project.author != null ? `${project.author.name}` : ""}
      </TableCell>
      <TableCell>
        <TextCellWithEdit<projEditTypes>
          val={project.title}
          openModal={openEditModal}
          edit="title"
        />
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
        <TextCellWithEdit<projEditTypes>
          val={project.tags?.map((tag) => tag.name) || []}
          openModal={openEditModal}
          edit="tags"
        />
      </TableCell>

      <TableCell>
        <ImgCellWithEdit
          val={project.customer?.name || ""}
          imgPath={project.customer?.logo || ""}
          openModal={openEditModal}
          edit="customer"
        />
      </TableCell>
      <TableCell>
        <TextCellWithEdit<projEditTypes>
          val={project.done}
          openModal={openEditModal}
          edit="done"
        />
      </TableCell>
      <TableCell>
        <TextCellWithEdit<projEditTypes>
          val={project.year}
          openModal={openEditModal}
          edit="year"
        />
      </TableCell>
      <TableCell>
        <TextCellWithEdit<projEditTypes>
          val={project.slug}
          openModal={openEditModal}
          edit="slug"
        />
      </TableCell>
      <TableCell>
        <TextCellWithEdit<projEditTypes>
          val={project.order}
          openModal={openEditModal}
          edit="order"
        />
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {str2rusDate(project.createdAt)}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {str2rusDate(project.updatedAt)}
      </TableCell>
      <TableCell align="right">
        <IconButton
          color="error"
          onClick={handleDeleteProject}
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

const styles: TStyles = {
  textCell: {
    maxWidth: "150px",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  img: {
    width: "calc(100% - 36px)",
    minWidth: "80px",
    mr: "8px",
    "&:hover": {
      cursor: "pointer",
    },
    "& img": {
      width: "100%",
      objectFit: "contain",
      objectPosition: "center",
    },
  },
};

export default memo(ProjectItem);
