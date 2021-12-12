import { Box, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { Navigation } from "swiper";
import { SERVER_URL } from "../lib/constants";
import { useMedia } from "../lib/useMedia";

interface IArticlesPromDisProps {
  article: IArticle;
  reverse: boolean;
}

const ArticlesPromDisCard = ({
  article,
  reverse,
}: IArticlesPromDisProps): JSX.Element => {
  const { matchesMobile } = useMedia();
  return (
    <Box sx={styles.root}>
      <Box
        sx={styles.article}
        style={{
          order: matchesMobile ? "" : reverse ? 0 : 1,
          padding: matchesMobile
            ? ""
            : reverse
            ? "0 16px 0 36px"
            : "0 36px 0 16px",
        }}
      >
        <Typography sx={styles.title} variant="h6">
          {article.title}
        </Typography>
        <Typography
          sx={{ whiteSpace: "pre-wrap" }}
          component="pre"
          color="#777777"
        >
          {article.content}
        </Typography>
      </Box>
      <Box
        sx={styles.slider}
        style={{ order: matchesMobile ? -1 : reverse ? 1 : 0 }}
      >
        <Swiper
          modules={[Navigation]}
          spaceBetween={0}
          navigation={true}
          slidesPerView={1}
        >
          {article.images?.map((img, i) => (
            <SwiperSlide key={i}>
              <Box sx={styles.img}>
                <img src={`${SERVER_URL}/${img}`} alt="Статья" />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    height: { xs: "", sm: "300px" },
    "& .swiper": {
      height: "100%",
      "&-slide": {
        display: "flex",
        justifyContent: "center",
        width: "100%!important",
        height: "100%",
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
    mb: "80px",
  },
  article: {
    width: { xs: "100%", sm: "46%" },
    p: { xs: "0 30px", sm: "" },
    height: "100%",
    userSelect: "none",
    textAlign: "justify",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    overflow: "hidden",
  },
  title: {
    fontWeight: 700,
    mb: "12px",
  },
  slider: {
    width: { xs: "100%", sm: "54%" },
    height: { xs: "250px", sm: "100%" },
    mb: { xs: "24px", sm: "" },
    overflow: "hidden",
  },
  img: {
    width: { xs: "100%", sm: "85%" },
    height: "100%",
    "& img": {
      width: "100%",
      height: "100%",
      borderRadius: { xs: "0px", sm: "5px" },
      objectFit: "cover",
      objectPosition: "center",
    },
  },
};

export default memo(ArticlesPromDisCard);
