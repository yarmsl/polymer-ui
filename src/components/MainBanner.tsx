import { Box, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { EffectFade } from "swiper";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { useRouteMatch } from "react-router";

SwiperCore.use([Autoplay, EffectFade, Pagination]);

const mock = [
  {
    text: "25 лет «УРАЛ–ПОЛИМЕР» проектирует и производит изделия из полимерных и композитных материалов для специальной техники, общественного транспорта, беспилотных летательных аппаратов, оборудования и станков.",
    image: "https://picsum.photos/id/2/1920/1080",
  },
  {
    text: "Работа над проектом начинается задолго до производства: рисуются эскизы, создаются модели для того, чтобы в полном объеме представить картину создаваемого объекта. вознаграждение",
    image: "https://picsum.photos/id/52/1920/1080",
  },
  {
    text: "Коммерческое Необходимые знания и опыт в области дизайна и создания изделий из композитов позволяют нам создавать конструкции практически любой сложности, которые обладают отличными техническими характеристиками и современным внешним видом.",
    image: "https://picsum.photos/id/13/1920/1080",
  },
];

const MainBanner = (): JSX.Element => {
  return (
    <Box sx={styles.root}>
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
        {mock?.map((article, i) => {
          return (
            <SwiperSlide key={i}>
              <Box sx={styles.slide}>
                <Typography sx={styles.article}>{article.text}</Typography>
                <Box sx={styles.blackout}></Box>
                <img src={article.image} alt='Статья' />
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
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
