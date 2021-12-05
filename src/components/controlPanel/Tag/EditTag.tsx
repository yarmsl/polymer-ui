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
import { useGetAllTagsQuery } from "../../../store/Tag";
import TagItem from "./TagItem";
  
  const EditTag = (): JSX.Element => {
    const { data, isLoading } = useGetAllTagsQuery("");
  
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
                <TableCell>Тег</TableCell>
                <TableCell>URL slug</TableCell>
                <TableCell>Создан</TableCell>
                <TableCell>Изменен</TableCell>
                <TableCell>Удалить</TableCell>
              </TableRow>
            </TableHead>
  
            <TableBody>
              {data?.map((tag) => (
                <TagItem key={tag._id} tag={tag}/>
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
  
  export default EditTag;
  
