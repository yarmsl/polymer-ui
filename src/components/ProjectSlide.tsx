import { Box, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { memo } from "react";
import { SERVER_URL } from "../lib/constants";

interface IProjectSlideProps {
  project: IProjectFull;
  showDescription: boolean;
}

const ProjectSlide = ({
  project,
  showDescription,
}: IProjectSlideProps): JSX.Element => {
  return (
    <Box sx={styles.slide}>
      {showDescription && (
        <Box sx={styles.description}>
          <Typography color="white" variant="body2">
            Заказчик: {project.customer.name}
          </Typography>
          <Typography color="white" variant="body2">
            {project.customer.description}
          </Typography>
          <Typography color="white" variant="body2">
            Проект: {project.title}
          </Typography>
          <Typography color="white" variant="body2">
            Выполненные работы: {project.done}.
          </Typography>
        </Box>
      )}
      <Box sx={styles.blackout}></Box>
      <img
        src={`${SERVER_URL}/${project.images?.[0] || ""}`}
        alt={project.title}
      />
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  slide: {
    width: "100%",
    height: "100%",
    position: "relative",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
  },
  description: {
    width: "100%",
    maxWidth: "900px",
    overflow: "hidden",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    bottom: 40,
    zIndex: 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    "&>p": {
      width: "180px",
      maxHeight: "100px",
    },
  },
  blackout: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(0,0,0, 0.4)",
    zIndex: 2,
  },
};

export default memo(ProjectSlide);
