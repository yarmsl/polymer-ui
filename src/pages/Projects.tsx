import { ReactElement } from "react";
import HelmetTitle from "../layouts/Helmet";
import { Box, Button, Container } from "@mui/material";
import { SxProps } from "@mui/system";
import { useGetProjectsDataQuery } from "../store/Data";
import { useHistory } from "react-router";
import ProjectCard, { SkeletonProjectCard } from "../components/ProjectCard";

const Projects = (): ReactElement => {
  const router = useHistory();
  const { data, isLoading } = useGetProjectsDataQuery("");
  return (
    <>
      <HelmetTitle title="Проекты" />
      <Container sx={styles.root} maxWidth="md">
        <Box sx={styles.cards}>
          {isLoading
            ? [0, 1, 2].map((n) => <SkeletonProjectCard key={n} />)
            : data?.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
        </Box>
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
  cards: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    mb: "50px",
  },
};

export default Projects;
