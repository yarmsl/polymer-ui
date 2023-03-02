import { Box, Typography } from "@mui/material";
import { useGetCustomersDataQuery } from "../store/Data";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { Navigation } from "swiper";
import CustomerCard, { SkeletonCustomerCard } from "./CustomerCard";
import { useMedia } from "../lib/useMedia";

const TrustUs = (): JSX.Element => {
  const { data, isLoading } = useGetCustomersDataQuery("");
  const { matchesMobile, matchesDesktop } = useMedia();
  return (
    <Box sx={styles.root}>
      <Typography variant="h5">Нам доверяют</Typography>
      <Box sx={styles.customers}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={0}
          navigation={true}
          slidesPerView={matchesMobile ? 1 : matchesDesktop ? 3 : 2}
        >
          {isLoading
            ? [0, 1, 2].map((ph) => (
                <SwiperSlide key={ph}>
                  <SkeletonCustomerCard key={ph} />
                </SwiperSlide>
              ))
            : data?.map((slide, i) => {
                return (
                  <SwiperSlide key={i}>
                    <CustomerCard customer={slide} />
                  </SwiperSlide>
                );
              })}
        </Swiper>
      </Box>
    </Box>
  );
};

const styles: TStyles = {
  root: {
    maxWidth: "900px",
    width: "100%",
    display: "flex",
    p: { xs: "50px 10px", md: "50px 0" },
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
  customers: {
    width: "100%",
    pt: "50px",
  },
};

export default TrustUs;
