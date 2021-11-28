import { Box, Button, Container, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { ReactComponent as DesignIcon } from "../assets/design_icon.svg";
import { ReactComponent as ModelIcon } from "../assets/model_icon.svg";
import { ReactComponent as EngineeringIcon } from "../assets/engineering_icon.svg";
import { ReactComponent as ProductionIcon } from "../assets/production_icon.svg";
import { ReactComponent as PerfectIcon } from "../assets/perfect_icon.svg";
import { EffectCube } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import SwiperCore from "swiper";
import React, { useCallback, useState } from "react";

SwiperCore.use([EffectCube]);

const abouts = [
  {
    title: "Дизайн",
    text: "Более четверти века мы занимаемся изделиями из композитных полимерных материалов. Мы не только производим изделия, но и проектируем их. Наша команда выполнила множество проектов, которые сейчас являются частью городской инфраструктуры: коммунальные и пожарные машины, городской транспорт и многое другое.",
    icon: <DesignIcon />,
  },
  {
    title: "От эскиза до 3D модели",
    text: "Работа над проектом начинается задолго до производства: рисуются эскизы, создаются модели для того, чтобы в полном объеме представить картину создаваемого объекта.",
    icon: <ModelIcon />,
  },
  {
    title: "Инжиниринг",
    text: "Необходимые знания и опыт в области дизайна и создания изделий из композитов позволяют нам создавать конструкции практически любой сложности, которые обладают отличными техническими характеристиками и современным внешним видом.",
    icon: <EngineeringIcon />,
  },
  {
    title: "Производство",
    text: "Современное производство позволяет реализовывать смелые конструкторские решения и обеспечивать необходимые объемы поставок продукции с должным качеством.",
    icon: <ProductionIcon />,
  },
  {
    title: "Совершенствование конструкции",
    text: "После разработки изделия мы остаемся в контакте с заказчиком. Дизайн, конструкция, экономическая составляющая - все это может быть улучшено в процессе дальнейшей работы над проектом.",
    icon: <PerfectIcon />,
  },
];

const MainAbout = (): JSX.Element => {
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);
  const [swiperIndex, setSwiperIndex] = useState<number>(1);
  const toSlide = useCallback(
    (index: number) => swiper?.slideTo(index),
    [swiper]
  );

  return (
    <Container sx={styles.root} maxWidth="md">
      <Box sx={styles.controls}>
        {abouts?.map((about, i) => {
          return (
            <Button
              color="secondary"
              sx={swiperIndex === i ? selected : styles.icon}
              key={i}
              onClick={() => toSlide(i + 1)}
            >
              <Box>{about.icon}</Box>
              <Typography>{about.title}</Typography>
            </Button>
          );
        })}
      </Box>
      <Box sx={styles.slider}>
        <Swiper
          onSlideChange={(sl) => setSwiperIndex(sl.realIndex)}
          onSwiper={(swiper) => setSwiper(swiper)}
          loop={true}
          effect="cube"
          cubeEffect={{
            shadow: false,
            slideShadows: false,
          }}
        >
          {abouts.map((slide, i) => {
            return (
              <SwiperSlide key={i}>
                <Box sx={styles.slide}>
                  <Typography>{slide.title}</Typography>
                  <Typography>{slide.text}</Typography>
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </Container>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    p: "60px 0",
    flexDirection: "column",
  },
  controls: {
    width: "100%",
    justifyContent: "space-between",
    display: "flex",
    alignItems: "flex-start",
    mb: "80px",
  },
  icon: {
    height: "124px",
    maxWidth: "24%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: "12px",
    lineHeight: "17px",
    textTransform: "uppercase",
    letterSpacing: "0.24em",
    "&>div": {
      width: "60px",
      height: "60px",
      mb: "10px",
      "& svg": {
        width: "100%",
        height: "100%",
      },
    },
  },
  selected: {
    color: "#000",
  },
  slider: {
    width: "100%",
    height: "120px",
  },
  slide: {
    width: "100%",
    display: "flex",
    userSelect: "none",
    backgroundColor: "white",
    "&>p:first-of-type": {
      minWidth: "180px",
      mr: "20px",
      fontSize: "18px",
      lineHeight: "22px",
    },
    "&>p:last-of-type": {
      flexGrow: 1,
      fontSize: "18px",
      lineHeight: "22px",
      color: "#777777",
      textAlign: "justify",
    },
  },
};

const selected = { ...styles.icon, ...styles.selected };

export default MainAbout;
