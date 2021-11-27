import { ReactElement } from "react";
import Header from "./Header";
import { Container } from "@mui/material";
import Footer from "./Footer";
import { SxProps } from "@mui/system";

export const pages = [
  {
    title: "Промышленный дизайн и инжиниринг",
    path: "/indastrial_design_and_engineering",
  },
  { title: "Производство", path: "/production" },
  { title: "Проекты", path: "/projects" },
  { title: "О компании", path: "/about" },
  { title: "Контакты", path: "/contacts" },
];

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
    flexGrow: 1
  },
};

export default MainLayout;
