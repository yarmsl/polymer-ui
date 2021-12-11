import {
  CircularProgress,
  IconButton,
  TableCell,
  TableRow,
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
import VacancyItemDialog, { vacancyEditTypes } from "./VacancyItem.dialog";
import { useDeleteVacancyMutation } from "../../../store/Vacancy";
import TextCellWithEdit from "../TextCellWithEdit";

interface IStoryItemProps {
  vacancy: IVacancyFull;
}

const VacancyItem = ({ vacancy }: IStoryItemProps) => {
  const [removeVacancy, { isLoading }] = useDeleteVacancyMutation();
  const dispatch = useAppDispatch();

  const handleDeleteVacancy = useCallback(async () => {
    try {
      const res = await removeVacancy(vacancy._id).unwrap();
      dispatch(showSuccessSnackbar(res.message || "success"));
    } catch (e) {
      dispatch(showErrorSnackbar((e as IQueryError).data.message || "fail"));
    }
  }, [dispatch, removeVacancy, vacancy]);

  const openEditModal = useCallback(
    (edit: vacancyEditTypes) =>
      dispatch(openModal(<VacancyItemDialog vacancy={vacancy} edit={edit} />)),
    [dispatch, vacancy]
  );

  return (
    <TableRow>
      <TableCell>
        {vacancy.author != null ? `${vacancy.author.name}` : ""}
      </TableCell>

      <TableCell>
        <TextCellWithEdit<vacancyEditTypes>
          val={vacancy.title}
          openModal={openEditModal}
          edit="title"
        />
      </TableCell>

      <TableCell>
        <TextCellWithEdit<vacancyEditTypes>
          val={vacancy.requirements}
          openModal={openEditModal}
          edit="requirements"
        />
      </TableCell>

      <TableCell>
        <TextCellWithEdit<vacancyEditTypes>
          val={vacancy.wage}
          openModal={openEditModal}
          edit="wage"
        />
      </TableCell>

      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {str2rusDate(vacancy.createdAt)}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {str2rusDate(vacancy.updatedAt)}
      </TableCell>
      <TableCell align="right">
        <IconButton
          color="error"
          onClick={handleDeleteVacancy}
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

export default memo(VacancyItem);
