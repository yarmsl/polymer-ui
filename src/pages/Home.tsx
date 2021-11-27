import { ReactElement } from "react";
import HelmetTitle from "../layouts/Helmet";
import { Container } from "@mui/material";

const Home = (): ReactElement => {
  return (
    <>
      <HelmetTitle title="Главная" />
      <Container sx={{display: 'block', '&>*':{ mb: '50px'}}}>
        <div>Главная</div>
        <div>Главная</div>
        <div>Главная</div>
        <div>Главная</div>
        <div>Главная</div>
        <div>Главная</div>
        <div>Главная</div>
        <div>Главная</div>
        <div>Главная</div>
        <div>Главная</div>
        <div>Главная</div>
        <div>Главная</div>
        <div>Главная</div>
        <div>Главная</div>
 
      </Container>
    </>
  );
};

export default Home;
