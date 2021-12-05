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
import { useGetAllCustomersQuery } from "../../../store/Customer";
import CustomerItem from "./CustomerItem";

const EditCustomer = (): JSX.Element => {
  const { data, isLoading } = useGetAllCustomersQuery("");

  return (
    <Container sx={styles.root} maxWidth="lg">
      <TableContainer component={Paper}>
        <Box sx={styles.loader}>
          {isLoading && <LinearProgress color="success" />}
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Автор</TableCell>
              <TableCell>Лого</TableCell>
              <TableCell>Заказчик</TableCell>
              <TableCell>URL slug</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell>Создан</TableCell>
              <TableCell>Изменен</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.map((customer) => (
              <CustomerItem key={customer._id} customer={customer} />
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

export default EditCustomer;
