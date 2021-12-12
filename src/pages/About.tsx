import { ReactElement, useMemo } from "react";
import HelmetTitle from "../layouts/Helmet";
import { Box, Button, Container, Skeleton, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { useHistory } from "react-router";
import {
  useGetStoriesDataQuery,
  useGetStoryArticlesDataQuery,
  useGetVacanciesDataQuery,
} from "../store/Data";
import StoryCard from "../components/StoryCard";
import StoryArticleCard from "../components/StoryArticleCard";
import VacancyCard from "../components/VacancyCard";

const About = (): ReactElement => {
  const router = useHistory();
  const { data: stories, isLoading: isStoriesLoading } =
    useGetStoriesDataQuery("");
  const { data: storyArticles, isLoading: isStoryArticlesLoading } =
    useGetStoryArticlesDataQuery("");
  const { data: vacancies, isLoading: isVacLoading } =
    useGetVacanciesDataQuery("");

  const sortedStories = useMemo(
    () =>
      Array.isArray(stories) && stories.length > 0
        ? [...stories].sort((a, b) => a.from - b.from)
        : [],
    [stories]
  );

  const leftColStories = useMemo(
    () => sortedStories?.filter((_, i) => i % 2 === 0) || [],
    [sortedStories]
  );
  const rightColStories = useMemo(
    () =>
      sortedStories.length > 1
        ? sortedStories?.filter((_, i) => i % 2 === 1) || []
        : [],
    [sortedStories]
  );

  const leftColVacancies = useMemo(
    () =>
      Array.isArray(vacancies) && vacancies.length > 0
        ? vacancies.filter((_, i) => i % 2 === 0)
        : [],
    [vacancies]
  );

  const rightColVacancies = useMemo(
    () =>
      Array.isArray(vacancies) && vacancies.length > 0
        ? vacancies.filter((_, i) => i % 2 === 1)
        : [],
    [vacancies]
  );

  return (
    <>
      <HelmetTitle title="О компании" />
      <Container sx={styles.root} maxWidth="md">
        {isStoriesLoading ? (
          <Skeleton variant="text" width="100%" height="30px" />
        ) : (
          <Typography sx={styles.title} variant="h5">
            История компании
          </Typography>
        )}
        <Box sx={styles.stories}>
          <Box sx={styles.leftSt}>
            {leftColStories?.map((story) => (
              <StoryCard key={story._id} story={story} />
            ))}
          </Box>
          <Box sx={{ ...styles.rightSt, mt: "50px" }}>
            {rightColStories?.map((story) => (
              <StoryCard key={story._id} story={story} />
            ))}
          </Box>
        </Box>
        <Box sx={styles.storyArticles}>
          {isStoryArticlesLoading &&
            [0, 1, 2].map((ph) => (
              <Skeleton key={ph} variant="text" width="100%" height="30px" />
            ))}
          {storyArticles?.map((stArt, i) => (
            <StoryArticleCard key={i} storyArticle={stArt} />
          ))}
        </Box>
        <Button
          sx={{ mb: "50px" }}
          onClick={() => router.push("/projects")}
          variant="contained"
          color="primary"
        >
          Наши проекты
        </Button>
        {isVacLoading ? (
          <Skeleton variant="text" width="100%" height="30px" />
        ) : (
          <Typography sx={styles.title} variant="h5">
            Вакансии
          </Typography>
        )}
        <Box sx={styles.stories}>
          <Box sx={styles.leftSt}>
            {leftColVacancies?.map((vac) => (
              <VacancyCard key={vac._id} vacancy={vac} />
            ))}
          </Box>
          <Box sx={styles.rightSt}>
            {rightColVacancies?.map((vac) => (
              <VacancyCard key={vac._id} vacancy={vac} />
            ))}
          </Box>
        </Box>
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    pt: "50px",
    pb: "80px",
  },
  title: {
    width: "100%",
    fontWeight: 700,
  },
  stories: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    m: "16px 0 50px",
  },
  leftSt: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    pr: "10px",
    "&>*:not(:last-of-type)": {
      mb: "20px",
    },
  },
  rightSt: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    pl: "10px",
    "&>*:not(:last-of-type)": {
      mb: "20px",
    },
  },
  storyArticles: {
    display: "flex",
    flexDirection: "column",
    mb: "50px",
  },
};

export default About;
