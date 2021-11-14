import { Container, Typography } from "@mui/material";
import { useGetAllUsersQuery } from "../../store/Users";
import UserItem from "./UserItem";

const EditUsers = (): JSX.Element => {
  const { data } = useGetAllUsersQuery("");

  return (
    <Container sx={styles.root} maxWidth="xs">
      <Typography variant="h5">Управление пользователями</Typography>
      {data?.map((item) => (
        <UserItem key={item.id} user={item} />
      ))}
    </Container>
  );
};

const styles = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    "&>*:not(:last-child)": {
        mb: "20px",
      },
  } as const,
};

export default EditUsers;
