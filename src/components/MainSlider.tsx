import { Box, Skeleton, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { useMemo } from "react";
import { SERVER_URL } from "../lib/constants";
import { useGetAllBannersQuery } from "../store/Banner";
import FadeCarousel from "../UI/FadeCarousel/FadeCarousel";

interface IArticleSlide {
  text: string;
  image: string;
}

const ArticleSlide = ({ text, image }: IArticleSlide): JSX.Element => {
  return (
    <Box sx={styles.slide}>
      <Typography variant="h6" component="h2" color="white" sx={styles.article}>
        {text}
      </Typography>
      <Box sx={styles.blackout}></Box>
      <img src={`${SERVER_URL}/${image}`} alt="Статья" />
    </Box>
  );
};

const MainSlider = (): JSX.Element => {
  const { data, isLoading } = useGetAllBannersQuery("");

  const slides = useMemo(
    () =>
      data?.map((banner, i) => (
        <ArticleSlide
          key={`article-${i}`}
          text={banner.text}
          image={banner.image}
        />
      )) || [],
    [data]
  );

  return (
    <Box sx={styles.root}>
      {isLoading && slides.length === 0 && (
        <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
      )}
      <FadeCarousel slides={slides} delay={15000} />
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
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
    width: "100%",
    maxWidth: "872px",
    minWidth: "300px",
    m: "0 10px",
    position: "absolute",
    zIndex: 4,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

export default MainSlider;
