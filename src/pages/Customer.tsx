import { ReactElement } from "react";
import HelmetTitle from "../layouts/Helmet";
import { Container } from "@mui/material";

const Customer = (): ReactElement => {
  return (
    <>
      <HelmetTitle title="Совместные проекты" />
      <Container>Совместные проекты</Container>
    </>
  );
};

export default Customer;
