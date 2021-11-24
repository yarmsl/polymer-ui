import { Box } from "@mui/material";
import { ReactElement } from "react";
import CreateUser from "../components/controlPanel/CreateUser";
import EditUsers from "../components/controlPanel/EditUsers";
import HelmetTitle from "../layouts/Helmet";

const UserManagment = (): ReactElement => {
  return (
    <>
      <HelmetTitle title="Управление Пользователями" />
      <Box sx={styles.root}>
        <CreateUser />
        <EditUsers />
      </Box>
    </>
  );
};

const styles = {
  root: {
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    "&>*": {
      m: "24px 0",
    },
  } as const,
};

export default UserManagment;
