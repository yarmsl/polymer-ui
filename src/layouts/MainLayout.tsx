import { ReactElement } from "react";
import Header from "./Header";
import { Container } from "@mui/material";
import Footer from "./Footer";

const styles = {
  root: {
    width: "100%",
    height: "100%",
  } as const,
};

const MainLayout = ({ children }: Child): ReactElement => {

  return (
    <>
      <Header />
      <Container disableGutters sx={styles.root} maxWidth={false}>
        <>{children}</>
      </Container>
      <Footer />
    </>
  );
};

export default MainLayout;
