import { Container } from "@mui/material";
import HelmetTitle from "../layouts/Helmet";

const NotFoundCP = (): JSX.Element => {
  return (
    <>
      <HelmetTitle title="404" />
      <Container>404</Container>
    </>
  );
};

export default NotFoundCP;
