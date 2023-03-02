import { Box, Skeleton } from "@mui/material";
import { useMemo } from "react";
import { useGetAllBannersQuery } from "../store/Banner";
import FadeCarousel from "../UI/FadeCarousel/FadeCarousel";
import MainArticleSlide from "./MainArticleSlide";

const MainSlider = (): JSX.Element => {
  const { data, isLoading } = useGetAllBannersQuery("");

  const slides = useMemo(
    () =>
      data?.map((banner, i) => (
        <MainArticleSlide
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

const styles: TStyles = {
  root: {
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
  },
};

export default MainSlider;
