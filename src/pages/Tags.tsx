import { ReactElement, useMemo } from "react";
import HelmetTitle from "../layouts/Helmet";
import { Button, Container, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { useGetProjectsDataQuery, useGetTagsDataQuery } from "../store/Data";
import { useHistory } from "react-router";
import ProjectsDrawer from "../components/ProjectsDrawer";

const Tags = (): ReactElement => {
  const router = useHistory();
  const { data: tags } = useGetTagsDataQuery("");
  const { data, isLoading } = useGetProjectsDataQuery("");

  const title = useMemo(
    () =>
      tags?.find((tag) => `/tag/${tag.slug}` === router.location.pathname)
        ?.name || "",
    [router.location.pathname, tags]
  );

  const projects = useMemo(
    () =>
      data?.filter((proj) =>
        proj.tags
          ?.map((tag) => tag.slug)
          ?.includes(router.location.pathname.substring(5))
      ) || [],
    [data, router.location.pathname]
  );

  return (
    <>
      <HelmetTitle title="Проекты" />
      <Container sx={styles.root} maxWidth="md">
        <Typography sx={styles.title} variant="h3">
          {title}
        </Typography>
        <ProjectsDrawer projects={projects} isLoading={isLoading} />
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
  title: {
    width: "100%",
    textAlign: "left",
    mb: "80px",
  },
};

export default Tags;
