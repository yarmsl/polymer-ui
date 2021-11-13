import { ReactElement } from "react";
import HelmetTitle from "../layouts/Helmet";
import { Container } from "@mui/material";

const Projects = (): ReactElement => {
  return (
    <>
      <HelmetTitle title="Проекты" />
      <Container>Проекты</Container>
    </>
  );
};

export default Projects;