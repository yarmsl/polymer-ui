import { Box, Button, Container, Typography } from "@mui/material";
import { EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import SwiperCore from "swiper";
import { useCallback, useState } from "react";
import { abouts } from "../lib/about";

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
              <Typography sx={styles.title}>{about.title}</Typography>
            </Button>
          );
        })}
      </Box>
      <Box sx={styles.slider}>
        <Swiper
          modules={[EffectFade]}
          onSlideChange={(sl) => setSwiperIndex(sl.realIndex)}
          onSwiper={(swiper) => setSwiper(swiper)}
          loop={true}
          effect="fade"
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

const styles: TStyles = {
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
    maxWidth: "25%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    lineHeight: "17px",
    textTransform: "uppercase",
    letterSpacing: { sm: "0.1em", md: "0.24em" },
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
  title: {
    fontSize: { sm: "10px", md: "14px" },
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
    height: "110px",
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
