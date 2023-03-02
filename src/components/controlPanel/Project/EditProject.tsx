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
import { useGetAllProjectsQuery } from "../../../store/Project";
import ProjectItem from "./ProjectItem";

const EditProject = (): JSX.Element => {
  const { data, isLoading } = useGetAllProjectsQuery("");

  return (
    <Container sx={styles.root} maxWidth="xl">
      <TableContainer component={Paper}>
        <Box sx={styles.loader}>
          {isLoading && <LinearProgress color="success" />}
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Автор</TableCell>
              <TableCell>Проект</TableCell>
              <TableCell>Изображения</TableCell>
              <TableCell>Тэги</TableCell>
              <TableCell>Заказчик</TableCell>
              <TableCell>Что сделано</TableCell>
              <TableCell>Год выполнения</TableCell>
              <TableCell>URL slug</TableCell>
              <TableCell>Порядковый номер</TableCell>
              <TableCell>Создан</TableCell>
              <TableCell>Изменен</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((project) => (
              <ProjectItem key={project._id} project={project} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

const styles: TStyles = {
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

export default EditProject;
