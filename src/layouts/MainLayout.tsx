import { ReactElement, Suspense, useMemo, lazy } from "react";
import { Container } from "@mui/material";
import MainBanner from "../components/MainBanner";
import { useRouteMatch } from "react-router";
import Loading from "./Loading";
import Header from "./Header";

const Footer = lazy(() => import("./Footer"));

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
  const match = useRouteMatch();
  const showBanner = useMemo(
    () =>
      [
        "/",
        ...pages
          .map((page) => page.path)
          .filter((path) => path !== "/contacts"),
      ].includes(match.path) && match.isExact,
    [match]
  );
  return (
    <>
      <Header />
      {showBanner && <MainBanner />}
      <Container disableGutters sx={styles.root} maxWidth={false}>
        <>{children}</>
      </Container>
      <Suspense fallback={<Loading />}>
        <Footer />
      </Suspense>
    </>
  );
};

const styles: TStyles = {
  root: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
  },
};

export default MainLayout;
