import { memo } from "react";
import { Box, Link, Skeleton, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { useHistory } from "react-router";
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
      <Typography variant="h6">{project.title}</Typography>
      <Link>Смотреть подробнее</Link>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "270px",
    height: "260px",
    m: "0 7px 33px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  imgWrapper: {
    width: "100%",
    height: "185px",
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
