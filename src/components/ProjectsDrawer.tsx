import { memo } from "react";

import { Box } from "@mui/material";

import ProjectCard, { SkeletonProjectCard } from "../components/ProjectCard";

interface IProjectsDrawerProps {
  projects?: IProjectFull[];
  isLoading: boolean;
}

const ProjectsDrawer = ({
  projects,
  isLoading,
}: IProjectsDrawerProps): JSX.Element => {
  return (
    <Box sx={styles.cards}>
      {isLoading
        ? [0, 1, 2].map((n) => <SkeletonProjectCard key={n} />)
        : projects?.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
    </Box>
  );
};

const styles: TStyles = {
  cards: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: { xs: "center", sm: "flex-start" },
    mb: "50px",
  },
};

export default memo(ProjectsDrawer);
