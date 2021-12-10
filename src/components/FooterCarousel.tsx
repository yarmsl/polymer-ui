import { Box, Skeleton, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import FeedBackDownload from "./FeedBackDownload";
import { useRouteMatch } from "react-router";
import FadeCarousel from "../UI/FadeCarousel/FadeCarousel";
import { useGetProjectsDataQuery } from "../store/Data";
import { SERVER_URL } from "../lib/constants";
import { useGetBottomBannerQuery } from "../store/Banner";
import { useMemo } from "react";

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
  const { data: projects, isLoading: isProjectsLoading } =
    useGetProjectsDataQuery("");
  const { data: bottomBanner, isLoading: isBottomBannerLoading } =
    useGetBottomBannerQuery("");

  const filteredProjects = useMemo(
    () =>
      projects?.filter((proj) => bottomBanner?.projects?.includes(proj._id)) ||
      [],
    [bottomBanner, projects]
  );

  const slides = useMemo(
    () =>
      filteredProjects?.map((project, i) => (
        <ProjectSlide key={`proj-${i}`} project={project} />
      )) || [],
    [filteredProjects]
  );

  return (
    <Box sx={styles.root}>
      <Box sx={styles.feedback}>
        {match.path !== "/contacts" && <FeedBackDownload />}
      </Box>
      {isProjectsLoading &&
        isBottomBannerLoading &&
        filteredProjects.length === 0 && (
          <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
        )}
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
  feedback: {
    position: "absolute",
    zIndex: 4,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

export default FooterCarousel;
