import { ReactElement } from "react";
import HelmetTitle from "../layouts/Helmet";
import { Container } from "@mui/material";

const About = (): ReactElement => {
  return (
    <>
      <HelmetTitle title="О компании" />
      <Container>О компании</Container>
    </>
  );
};

export default About;