import { ReactElement } from "react";
import HelmetTitle from "../layouts/Helmet";
import { Container } from "@mui/material";

const Production = (): ReactElement => {
  return (
    <>
      <HelmetTitle title="Производство" />
      <Container>Производство</Container>
    </>
  );
};

export default Production;
