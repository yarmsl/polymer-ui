import { ReactElement } from "react";
import HelmetTitle from "../layouts/Helmet";
import { Container } from "@mui/material";

const Home = (): ReactElement => {
  return (
    <>
      <HelmetTitle title="Главная" />
      <Container>Главная</Container>
    </>
  );
};

export default Home;
