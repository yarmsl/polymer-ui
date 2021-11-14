import { ReactElement } from "react";
import HelmetTitle from "../layouts/Helmet";
import { Container } from "@mui/material";
import CreateUser from "../components/controlPanel/CreateUser";
import { useAppSelector } from "../store";
import EditUsers from "../components/controlPanel/EditUsers";

const ControlPanel = (): ReactElement => {
  const { role } = useAppSelector((st) => st.auth);
  return (
    <>
      <HelmetTitle title="Панель управления" />
      <Container sx={styles.root}>
        {role === "admin" && <CreateUser />}
        {role === "admin" && <EditUsers />}
      </Container>
    </>
  );
};

const styles = {
  root: {
    width: '100%',
    display: "flex",
    flexDirection: "column",
    '&>*:not(:last-child)': {
      mb: '16px'
    }

  } as const,
};

export default ControlPanel;
