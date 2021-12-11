import {
  Box,
  CircularProgress,
  IconButton,
  TableCell,
  TableRow,
} from "@mui/material";
import { memo, useCallback, useMemo } from "react";
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
import ProjectItemDialog, { stepEditTypes } from "./StepItem.dialog";
import { useDeleteProductionStepMutation } from "../../../store/Production";
import { useGetProductionArticlesDataQuery } from "../../../store/Data";
import TextCellWithEdit from "../TextCellWithEdit";

interface IStepItemProps {
  step: IStepFull;
}

const StepItem = ({ step }: IStepItemProps) => {
  const { data } = useGetProductionArticlesDataQuery("");
  const articleTitle = useMemo(
    () =>
      Array.isArray(data)
        ? data.find((article) => article._id === step.productionArticle)
            ?.title || ""
        : "",
    [data, step.productionArticle]
  );
  const [removeStep, { isLoading }] = useDeleteProductionStepMutation();
  const dispatch = useAppDispatch();

  const handleDeleteStep = useCallback(async () => {
    try {
      const res = await removeStep(step._id).unwrap();
      dispatch(showSuccessSnackbar(res.message || "success"));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError).data.message || "fail"));
    }
  }, [dispatch, removeStep, step]);

  const openEditModal = useCallback(
    (edit: stepEditTypes) =>
      dispatch(openModal(<ProjectItemDialog step={step} edit={edit} />)),
    [dispatch, step]
  );

  return (
    <TableRow>
      <TableCell>{step.author != null ? `${step.author.name}` : ""}</TableCell>
      <TableCell>
        <Box sx={styles.img}>
          <img src={`${SERVER_URL}/${step.image}`} alt="Подстатья" />
        </Box>
      </TableCell>
      <TableCell>
        <TextCellWithEdit<stepEditTypes>
          val={articleTitle}
          openModal={openEditModal}
          edit="productionArticle"
        />
      </TableCell>
      <TableCell>
        <TextCellWithEdit<stepEditTypes>
          val={step.title}
          openModal={openEditModal}
          edit="title"
        />
      </TableCell>
      <TableCell>
        <TextCellWithEdit<stepEditTypes>
          val={step.content}
          openModal={openEditModal}
          edit="content"
        />
      </TableCell>
      <TableCell>
        <TextCellWithEdit<stepEditTypes>
          val={step.order}
          openModal={openEditModal}
          edit="order"
        />
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {str2rusDate(step.createdAt)}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {str2rusDate(step.updatedAt)}
      </TableCell>
      <TableCell align="right">
        <IconButton
          color="error"
          onClick={handleDeleteStep}
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
  img: {
    width: "calc(100% - 36px)",
    minWidth: "80px",
    maxWidth: "120px",
    "& img": {
      width: "100%",
      objectFit: "contain",
      objectPosition: "center",
    },
  },
};

export default memo(StepItem);
