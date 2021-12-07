import { memo } from "react";
import { Box, Link, Skeleton, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
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
        <Skeleton variant="rectangular" width={"100%"} height={'100%'} />
      </Box>
    </Box>
  );
};

const ProjectCard = ({ project }: IProjectCardProps): JSX.Element => {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.info}>
        <Typography variant="h6">{project.title}</Typography>
        <Link
          sx={styles.link}
          component={RouterLink}
          to={`/project/${project.slug}`}
        >
          Смотреть подробнее
        </Link>
      </Box>

      <Box sx={styles.imgWrapper}>
        <img src={`${SERVER_URL}/${project.images[0]}`} alt={project.title} />
      </Box>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    height: "300px",
    display: "flex",
  },
  info: {
    height: "100%",
    width: "45%",
    pr: "80px",
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
    width: "55%",
    height: "100%",
    borderRadius: "5px",
    overflow: "hidden",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
  },
};

export default memo(ProjectCard);
