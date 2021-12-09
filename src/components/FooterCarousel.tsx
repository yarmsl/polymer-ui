import { Box, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import FeedBackDownload from "./FeedBackDownload";
import { useRouteMatch } from "react-router";
import FadeCarousel from "../UI/FadeCarousel/FadeCarousel";
import { useGetProjectsDataQuery } from "../store/Data";
import { SERVER_URL } from "../lib/constants";

interface IProjectSlideProps {
  project: IProjectFull;
}

const ProjectSlide = ({ project }: IProjectSlideProps): JSX.Element => {
  return (
    <Box sx={styles.slide}>
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
      <Box sx={styles.blackout}></Box>
      <img
        src={`${SERVER_URL}/${project.images?.[0] || ""}`}
        alt={project.title}
      />
    </Box>
  );
};

const FooterCarousel = (): JSX.Element => {
  const match = useRouteMatch();
  const { data, isLoading } = useGetProjectsDataQuery("");
  const slides =
    data?.map((project, i) => (
      <ProjectSlide key={`proj-${i}`} project={project} />
    )) || [];
  return (
    <Box sx={styles.root}>
      <Box sx={styles.feedback}>
        {match.path !== "/contacts" && <FeedBackDownload />}
      </Box>
      <FadeCarousel slides={slides} delay={15000} />
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    height: "525px",
    overflow: "hidden",
    position: "relative",
    display: "flex",
  },
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
    width: "180px",
    maxHeight: "150px",
    overflow: "hidden",
    position: "absolute",
    margin: "0 50%",
    bottom: 40,
    left: 250,
    zIndex: 3,
    "&>p": {
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  blackout: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(0,0,0, 0.4)",
    zIndex: 2,
  },
  feedback: {
    position: "absolute",
    zIndex: 4,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

export default FooterCarousel;
