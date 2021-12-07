import { ReactElement, useMemo } from "react";
import HelmetTitle from "../layouts/Helmet";
import { Box, Button, Container, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { useGetProjectsDataQuery } from "../store/Data";
import { useHistory } from "react-router";
import { SERVER_URL } from "../lib/constants";

const Project = (): ReactElement => {
  const router = useHistory();
  const { data, isLoading } = useGetProjectsDataQuery("");
  const project = useMemo(() => {
    if (!isLoading && router?.location?.pathname != null && data != null) {
      return data.find(
        (project) => `/project/${project.slug}` === router.location.pathname
      );
    }
  }, [data, isLoading, router.location.pathname]);

  return (
    <>
      <HelmetTitle title="Проект" />
      <Container sx={styles.root} maxWidth="md">
        <Box sx={styles.main}>
          <Typography sx={styles.year}>{project?.year}</Typography>
          <img src={`${SERVER_URL}/${project?.images[0]}`} alt="Проект" />
        </Box>
        <Box sx={styles.info}>
          <Typography sx={styles.title} variant="h3">
            {project?.title}
          </Typography>
          <Typography variant="h6">
            <b>Проект:</b> {project?.title}
          </Typography>
          {project?.customer && (
            <Typography variant="h6">
              <b>Заказчик:</b> {project.customer.name}
            </Typography>
          )}
          {project?.done && (
            <Typography variant="h6">
              <b>Выполненные работы:</b>
              <br /> {project.done}
            </Typography>
          )}
        </Box>
        {project?.images && project?.images.length > 1 && (
          <Box sx={styles.photoes}>
            <Box sx={styles.wrapper}>
              {project.images?.map((photo, i) => {
                return (
                  <Box sx={styles.photo} key={i}>
                    <img src={`${SERVER_URL}/${photo}`} alt="Проект" />
                  </Box>
                );
              })}
            </Box>
            <Typography variant="subtitle1">
              Изображения взяты из открытых источников
            </Typography>
          </Box>
        )}
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
    p: "30px 0 80px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  main: {
    width: "100%",
    height: "560px",
    position: "relative",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      borderRadius: "5px",
      overflow: "hidden",
    },
  },
  year: {
    width: "350px",
    position: "absolute",
    transform: "rotate(90deg) translateX(50%)",
    color: "primary.main",
    fontSize: "144px",
    fontWeight: 700,
    lineHeight: 1,
    right: "-175px",
    userSelect: "none",
  },
  info: {
    width: "100%",
    mb: "40px",
    "&>*:not(:first-child)": {
      mb: "12px",
    },
  },
  title: {
    color: "primary.main",
  },
  photoes: {
    width: "100%",
    mb: "45px",
    display: "flex",
    flexWrap: "wrap",
  },
  wrapper: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
  },
  photo: {
    width: "33.33%",
    p: "5px",
    boxSizing: "border-box",
    height: "190px",

    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      borderRadius: "5px",
      overflow: "hidden",
    },
  },
};

export default Project;
