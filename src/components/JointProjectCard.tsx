import { memo } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { SERVER_URL } from "../lib/constants";

interface IProjectCardProps {
  project: IProject;
}

export const SkeletonJointProjectCard = (): JSX.Element => {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.info}>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </Box>
      <Box sx={styles.imgWrapper}>
        <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
      </Box>
    </Box>
  );
};

const ProjectCard = ({ project }: IProjectCardProps): JSX.Element => {
  return (
    <Box
      component={RouterLink}
      to={`/project/${project.slug}`}
      sx={styles.root}
    >
      <Box sx={styles.info}>
        <Typography variant="h6">{project.title}</Typography>
        <Typography sx={styles.link}>Смотреть подробнее</Typography>
      </Box>
      <Box sx={styles.imgWrapper}>
        <img src={`${SERVER_URL}/${project.images[0]}`} alt={project.title} />
      </Box>
    </Box>
  );
};

const styles: TStyles = {
  root: {
    width: "100%",
    height: { xs: "", sm: "300px" },
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    textDecoration: "none",
    color: "#000",
  },
  info: {
    order: { xs: 1, sm: 0 },
    height: { xs: "", sm: "100%" },
    width: { xs: "100%", sm: "45%" },
    pr: { xs: "", sm: "80px" },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  link: {
    color: "primary.main",
    fontSize: "18px",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  imgWrapper: {
    order: { xs: 0, sm: 1 },
    width: { xs: "100%", sm: "55%" },
    height: { xs: "275px", sm: "100%" },
    borderRadius: "5px",
    overflow: "hidden",
    mb: { xs: "16px", sm: "" },
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
  },
};

export default memo(ProjectCard);
