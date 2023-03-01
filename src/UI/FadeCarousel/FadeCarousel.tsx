import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { EffectFade } from "swiper";
import { Autoplay, Pagination } from "swiper";
import "./FadeCarousel.css";

const FadeCarousel = ({ slides, delay }: IFadeCarouselProps): JSX.Element => {
  return (
    <Swiper
      modules={[Autoplay, EffectFade, Pagination]}
      loop={true}
      effect="fade"
      autoplay={{
        delay,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 3,
      }}
      initialSlide={1}
    >
      {slides?.map((slide, i) => {
        return <SwiperSlide key={i}>{slide}</SwiperSlide>;
      })}
    </Swiper>
  );
};

export default memo(FadeCarousel);
