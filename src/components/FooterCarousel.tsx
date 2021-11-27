import { Box, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { EffectFade } from "swiper";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import FeedBackDownload from "./FeedBackDownload";
import { useRouteMatch } from "react-router";

SwiperCore.use([Autoplay, EffectFade, Pagination]);
const mock = [
  {
    customer: {
      name: "ООО Рога и Копыта",
      description: "Входит в группу пьяным",
    },
    title: "Вагон",
    done: "Всяческие работы выполнены над вагоном",
    images: ["https://picsum.photos/id/533/1920/1080"],
  },
  {
    customer: {
      name: "ООО Вертикаль",
      description: "Агенство по выполнению наличных обязательств",
    },
    title: "Коммерческое вознаграждение",
    done: "ЧТо сделано - то сделано",
    images: ["https://picsum.photos/id/111/1920/1080"],
  },
  {
    customer: {
      name: "АО ГазПром",
      description: "Управляй мечтой",
    },
    title: "Северный поток",
    done: "Развернули северный поток на юг, а потом на запад, а потом опять на север, а потом на восток, крутили им как хотели Развернули северный поток на юг, а потом на запад, а потом опять на север, а потом на восток, крутили им как хотелиРазвернули северный поток на юг, а потом на запад, а потом опять на север, а потом на восток, крутили им как хотелиРазвернули северный поток на юг, а потом на запад, а потом опять на север, а потом на восток, крутили им как хотелиРазвернули северный поток на юг, а потом на запад, а потом опять на север, а потом на восток, крутили им как хотели",
    images: ["https://picsum.photos/id/55/1920/1080"],
  },
];

const FooterCarousel = (): JSX.Element => {
  const match = useRouteMatch();
  return (
    <Box sx={styles.root}>
      <Box sx={styles.feedback}>
        {match.path !== "/contacts" && <FeedBackDownload />}
      </Box>
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
                <img src={project.images?.[0]} alt={project.title} />
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
