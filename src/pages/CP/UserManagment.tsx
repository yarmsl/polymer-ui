import { Box } from "@mui/material";
import { SxProps } from "@mui/system";
import { ReactElement } from "react";
import CreateUser from "../../components/controlPanel/User/CreateUser";
import EditUsers from "../../components/controlPanel/User/EditUsers";
import HelmetTitle from "../../layouts/Helmet";

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

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    "&>*": {
      m: "24px 0",
    },
  },
};

export default UserManagment;
