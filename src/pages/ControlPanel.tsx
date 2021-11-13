import { ReactElement } from "react";
import HelmetTitle from "../layouts/Helmet";
import { Container } from "@mui/material";

const ControlPanel = (): ReactElement => {
  return (
    <>
      <HelmetTitle title="Панель управления" />
      <Container>Панель управления</Container>
    </>
  );
};

export default ControlPanel;