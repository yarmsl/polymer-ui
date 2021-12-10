import { ReactElement } from "react";
import HelmetTitle from "../layouts/Helmet";
import { Box, Button, Container } from "@mui/material";
import { SxProps } from "@mui/system";
import { useHistory } from "react-router";
import { useGetTagsDataQuery } from "../store/Data";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { Navigation } from "swiper";
import TagCard, { SkeletonTagCard } from "../components/TagCard";

const IndDesEngineering = (): ReactElement => {
  const router = useHistory();
  const { data, isLoading } = useGetTagsDataQuery("");
  return (
    <>
      <HelmetTitle title="Промышленный дизайн и инжиниринг" />
      <Box sx={styles.root}>
        <Box sx={styles.tags}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={0}
            navigation={true}
            slidesPerView={3}
          >
            {isLoading
              ? [0, 1, 2].map((ph) => (
                  <SwiperSlide key={ph}>
                    <SkeletonTagCard key={ph} />
                  </SwiperSlide>
                ))
              : data?.map((slide, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <TagCard tag={slide} />
                    </SwiperSlide>
                  );
                })}
          </Swiper>
        </Box>
        <Button
          onClick={() => router.goBack()}
          variant="contained"
          color="primary"
        >
          Вернуться назад
        </Button>
      </Box>
      <Container maxWidth="md"></Container>
    </>
  );
};
const styles: Record<string, SxProps> = {
  root: {
    maxWidth: "900px",
    width: "100%",
    display: "flex",
    padding: "50px 0",
    flexDirection: "column",
    alignItems: "center",
    "& .swiper": {
      "&-slide": {
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
    mb: '50px'
  },
};
export default IndDesEngineering;
