import { Box } from "@mui/material";
import { SxProps } from "@mui/system";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { EffectFade } from "swiper";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import FeedBackDownload from "./FeedBackDownload";
import { useRouteMatch } from "react-router";

const mock = [
    {
      article: "Вагон",
      image: "https://picsum.photos/id/533/1920/1080",
    },
    {

      article: "Коммерческое вознаграждение",
      image: "https://picsum.photos/id/111/1920/1080",
    },
    {

        article: "Коммерческое вознаграждение",
      images: ["https://picsum.photos/id/55/1920/1080"],
    },
  ];

const MainBanner = (): JSX.Element => {
  return <Box sx={styles.root}>
       <Swiper
        effect="fade"
        autoplay={{
          delay: 15000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3,
        }}
      >
        {mock?.map((project, i) => {
          return (
            <SwiperSlide key={i}>
              <Box sx={styles.slide}>
                <Box sx={styles.article}>

                </Box>
                <Box sx={styles.blackout}></Box>
                <img src={project.images?.[0]} alt={project.title} />
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
  </Box>;
};

const styles: Record<string, SxProps> = {
    root: {
      width: "100%",
      height: "525px",
      overflow: "hidden",
      position: "relative",
      display: "flex",
      "& .swiper-pagination": {
        "&-bullets-dynamic": {
          margin: "0 50%",
          left: "-400px!important",
          bottom: "40px!important",
          zIndex: 3,
        },
        "&-bullet": {
          backgroundColor: "#fff",
          opacity: 1,
          "&-active": {
            backgroundColor: "primary.main",
          },
        },
      },
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
    blackout: {
      width: "100%",
      height: "100%",
      position: "absolute",
      backgroundColor: "rgba(0,0,0, 0.4)",
      zIndex: 2,
    },
    article: {
      position: "absolute",
      zIndex: 4,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  };
  

export default MainBanner;
