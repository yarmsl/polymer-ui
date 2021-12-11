import {
  Box,
  Container,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { SxProps } from "@mui/system";
import { useGetAllVacanciesQuery } from "../../../store/Vacancy";
import VacancyItem from "./VacancyItem";

const EditVacancy = (): JSX.Element => {
  const { data, isLoading } = useGetAllVacanciesQuery("");

  return (
    <Container sx={styles.root} maxWidth="md">
      <TableContainer component={Paper}>
        <Box sx={styles.loader}>
          {isLoading && <LinearProgress color="success" />}
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Автор</TableCell>
              <TableCell>Вакансия</TableCell>
              <TableCell>Требования</TableCell>
              <TableCell>З/П от</TableCell>
              <TableCell>Создана</TableCell>
              <TableCell>Изменена</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((vacancy) => (
              <VacancyItem key={vacancy._id} vacancy={vacancy} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loader: {
    width: "100%",
    height: "4px",
    overflow: "hidden",
  },
};

export default EditVacancy;
