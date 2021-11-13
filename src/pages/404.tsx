import { Container } from "@mui/material";
import HelmetTitle from "../layouts/Helmet";

const NotFound = (): JSX.Element => {
  return (
    <>
      <HelmetTitle title="main" />
      <Container>404</Container>
    </>
  );
};

export default NotFound;
