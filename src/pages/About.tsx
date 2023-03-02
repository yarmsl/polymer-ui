import { ReactElement } from "react";
import HelmetTitle from "../layouts/Helmet";
import { Button, Container } from "@mui/material";
import { useHistory } from "react-router";
import VacanciesDrawer from "../components/VacanciesDrawer";
import StoryArticlesDrawer from "../components/StoryArticlesDrawer";
import StoriesDrawer from "../components/StoriesDrawer";

const About = (): ReactElement => {
  const router = useHistory();
  return (
    <>
      <HelmetTitle title="О компании" />
      <Container sx={styles.root} maxWidth="md">
        <StoriesDrawer />
        <StoryArticlesDrawer />
        <Button
          sx={{ mb: "50px" }}
          onClick={() => router.push("/projects")}
          variant="contained"
          color="primary"
        >
          Наши проекты
        </Button>
        <VacanciesDrawer />
        <Button
          onClick={() => router.goBack()}
          variant="contained"
          color="primary"
        >
          Вернуться назад
        </Button>
      </Container>
    </>
  );
};

const styles: TStyles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    pt: "50px",
    pb: "80px",
  },
};

export default About;
