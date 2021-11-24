import { ReactElement } from "react";
import Header from "./Header";
import { Container } from "@mui/material";
import Footer from "./Footer";
import { SxProps } from "@mui/system";

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

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    height: "100%",
  },
};

export default MainLayout;
