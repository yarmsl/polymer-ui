import { ReactElement } from "react";
import HelmetTitle from "../layouts/Helmet";
import { Box, Button, Container } from "@mui/material";
import { useHistory } from "react-router";
import { useGetArticlesDataQuery, useGetTagsDataQuery } from "../store/Data";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { Navigation } from "swiper";
import TagCard, { SkeletonTagCard } from "../components/TagCard";
import ArticlePromDisCard from "../components/ArticlePromDisCard";
import { useMedia } from "../lib/useMedia";

const IndDesEngineering = (): ReactElement => {
  const router = useHistory();
  const { data: tags, isLoading: isLoadingTags } = useGetTagsDataQuery("");
  const { data: articles } = useGetArticlesDataQuery("");
  const { matchesDesktop } = useMedia();
  return (
    <>
      <HelmetTitle title="Промышленный дизайн и инжиниринг" />
      <Box sx={styles.root}>
        {matchesDesktop && (
          <Box sx={styles.tags}>
            <Swiper
              modules={[Navigation]}
              spaceBetween={0}
              navigation={true}
              slidesPerView={3}
            >
              {isLoadingTags
                ? [0, 1, 2].map((ph) => (
                    <SwiperSlide key={ph}>
                      <SkeletonTagCard key={ph} />
                    </SwiperSlide>
                  ))
                : tags?.map((slide, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <TagCard tag={slide} />
                      </SwiperSlide>
                    );
                  })}
            </Swiper>
          </Box>
        )}
        {!matchesDesktop && (
          <Box sx={styles.tagsMobile}>
            {isLoadingTags
              ? [0, 1, 2].map((ph) => <SkeletonTagCard key={ph} />)
              : tags?.map((slide, i) => {
                  return <TagCard key={i} tag={slide} />;
                })}
          </Box>
        )}
      </Box>
      <Container disableGutters sx={styles.articles} maxWidth="md">
        {articles?.map((article, i) => (
          <ArticlePromDisCard
            key={article._id}
            article={article}
            reverse={i % 2 === 0}
          />
        ))}
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
const styles: TStyles = {
  root: {
    maxWidth: "900px",
    width: "100%",
    display: "flex",
    padding: "50px 0",
    flexDirection: "column",
    alignItems: "center",
    "& .swiper": {
      "&-slide": {
        minWidth: "210px",
        display: "flex",
        justifyContent: "center",
      },
      "&-button": {
        "&-prev": {
          left: "0px",
          color: "secondary.main",
        },
        "&-next": {
          right: "0px",
          color: "secondary.main",
        },
      },
    },
  },
  tags: {
    width: "100%",
    mb: "50px",
  },
  tagsMobile: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    "&>*:not(:last-of-type)": {
      mb: "24px",
    },
  },
  articles: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    pb: "50px",
  },
};
export default IndDesEngineering;
