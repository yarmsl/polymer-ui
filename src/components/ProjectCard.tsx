import { memo } from "react";
import { Box, Link, Skeleton, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import { SERVER_URL } from "../lib/constants";

interface IProjectCardProps {
  project: IProjectFull;
}

export const SkeletonProjectCard = (): JSX.Element => {
  return (
    <Box sx={styles.root}>
      <Skeleton variant="rectangular" width={270} height={185} />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </Box>
  );
};

const ProjectCard = ({ project }: IProjectCardProps): JSX.Element => {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgWrapper}>
        <img src={`${SERVER_URL}/${project.images[0]}`} alt={project.title} />
      </Box>
      <Typography sx={styles.title} variant="h6">{project.title}</Typography>
      <Link
        sx={styles.link}
        component={RouterLink}
        to={`/project/${project.slug}`}
      >
        Смотреть подробнее
      </Link>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "33.33%",
    height: "270px",
    p: "0 7px",
    mb: '33px',
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  imgWrapper: {
    width: "100%",
    minHeight: '185px',
    height: "185px",
    borderRadius: "5px",
    overflow: "hidden",
    mb: '10px',
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
  },
  title: {
    height: '42px',
    lineHeight: 1.2,

  },
  link: {
    color: "primary.main",
    fontSize: "18px",
    "&:hover": {
      textDecoration: "underline",
    },
  },
};

export default memo(ProjectCard);
