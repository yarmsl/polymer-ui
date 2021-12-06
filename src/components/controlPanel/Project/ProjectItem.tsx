import {
  Button,
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
import { SxProps } from "@mui/system";
import { SERVER_URL } from "../../../lib/constants";
import { useDeleteProjectMutation } from "../../../store/Project";

interface IProjectItemProps {
  project: IProjectFull;
}

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
  return (
    <TableRow>
      <TableCell>
        {project.author != null ? `${project.author.name}` : ""}
      </TableCell>
      <TableCell>{project.title}</TableCell>
      <TableCell>
        <Tooltip arrow title="Изменить">
          <Button
            size="small"
            color="info"
            //   onClick={() =>
            //     dispatch(
            //       openModal(
            //         <CustomerItemDialog customer={customer} edit="name" />
            //       )
            //     )
            //   }
          >
            {project.tags?.map((tag) => tag?.name)?.join(", ") || ""}
          </Button>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip arrow title="Изменить">
          <Button
            size="small"
            color="info"
            //   onClick={() =>
            //     dispatch(
            //       openModal(
            //         <CustomerItemDialog customer={customer} edit="slug" />
            //       )
            //     )
            //   }
          >
            {project.customer?.name}
          </Button>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip arrow title="Изменить">
          <Button
            sx={styles.long}
            size="small"
            color="info"
            //   onClick={() =>
            //     dispatch(
            //       openModal(
            //         <CustomerItemDialog customer={customer} edit="description" />
            //       )
            //     )
            //   }
          >
            {project.done}
          </Button>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip arrow title="Изменить">
          <Button
            sx={styles.long}
            size="small"
            color="info"
            //   onClick={() =>
            //     dispatch(
            //       openModal(
            //         <CustomerItemDialog customer={customer} edit="description" />
            //       )
            //     )
            //   }
          >
            {project.year}
          </Button>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip arrow title="Изменить">
          <Button
            sx={styles.long}
            size="small"
            color="info"
            //   onClick={() =>
            //     dispatch(
            //       openModal(
            //         <CustomerItemDialog customer={customer} edit="description" />
            //       )
            //     )
            //   }
          >
            {project.slug}
          </Button>
        </Tooltip>
      </TableCell>
      <TableCell>{str2rusDate(project.createdAt)}</TableCell>
      <TableCell>{str2rusDate(project.updatedAt)}</TableCell>
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

const styles: Record<string, SxProps> = {
  long: {
    maxWidth: "200px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordBreak: "break-all",
    whiteSpace: "nowrap",
  },
};

export default memo(ProjectItem);
