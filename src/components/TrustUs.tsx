import { Box, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { useGetCustomersDataQuery } from "../store/Data";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { Navigation } from "swiper";
import CustomerCard from "./CustomerCard";
//Прописать стили для слайдера @yarmsl
const TrustUs = (): JSX.Element => {
  const { data, isLoading } = useGetCustomersDataQuery("");
  return (
    <Box sx={styles.root}>
      <Typography variant="h5">Нам доверяют</Typography>
      <Box sx={styles.customers}>
        <Swiper modules={[Navigation]} spaceBetween={0} navigation={true} slidesPerView={3} >
          {data?.map((slide, i) => {
            return (
              <SwiperSlide style={{display: 'flex', justifyContent: 'center'}} key={i}> 
                <CustomerCard customer={slide} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    maxWidth: "950px",
    width: "100%",
    display: "flex",
    padding: "50px 0",
    flexDirection: "column",
    alignItems: "center",
  },
  customers: {
    width: "100%",
    pt: "50px",
  },
};

export default TrustUs;
