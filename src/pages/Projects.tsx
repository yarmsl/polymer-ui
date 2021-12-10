import { ReactElement } from "react";
import HelmetTitle from "../layouts/Helmet";
import { Button, Container } from "@mui/material";
import { SxProps } from "@mui/system";
import { useGetProjectsDataQuery } from "../store/Data";
import { useHistory } from "react-router";
import ProjectsDrawer from "../components/ProjectsDrawer";

const Projects = (): ReactElement => {
  const router = useHistory();
  const { data, isLoading } = useGetProjectsDataQuery("");
  return (
    <>
      <HelmetTitle title="Проекты" />
      <Container sx={styles.root} maxWidth="md">
        <ProjectsDrawer projects={data} isLoading={isLoading} />
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

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    padding: "50px 0px 100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default Projects;
