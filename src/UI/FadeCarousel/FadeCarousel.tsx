import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { EffectFade } from "swiper";
import { Autoplay, Pagination } from "swiper";
import "./FadeCarousel.scss";

const FadeCarousel = ({ slides, delay }: IFadeCarouselProps): JSX.Element => {
  return (
    <Swiper
      className={"fade-carousel"}
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
    >
      {slides?.map((slide, i) => {
        return <SwiperSlide key={i}>{slide}</SwiperSlide>;
      })}
    </Swiper>
  );
};

export default memo(FadeCarousel);
