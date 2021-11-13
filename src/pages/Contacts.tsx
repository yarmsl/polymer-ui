import { ReactElement } from "react";
import HelmetTitle from "../layouts/Helmet";
import { Container } from "@mui/material";

const Contacts = (): ReactElement => {
  return (
    <>
      <HelmetTitle title="Контакты" />
      <Container>Контакты</Container>
    </>
  );
};

export default Contacts;