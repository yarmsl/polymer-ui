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
import { useMemo } from "react";
import { useGetAllStoriesQuery } from "../../../store/Story";
import StoryItem from "./StoryItem";

const EditStory = (): JSX.Element => {
  const { data, isLoading } = useGetAllStoriesQuery("");

  const sortedData = useMemo(
    () =>
      Array.isArray(data) ? [...data].sort((a, b) => b.from - a.from) : [],
    [data]
  );

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
              <TableCell>Год (с...)</TableCell>
              <TableCell>По</TableCell>
              <TableCell>История</TableCell>
              <TableCell>Создан</TableCell>
              <TableCell>Изменен</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData?.map((story) => (
              <StoryItem key={story._id} story={story} />
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

export default EditStory;
