import { memo } from 'react';

import { EffectFade } from 'swiper';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import './FadeCarousel.css';

const FadeCarousel = ({ slides, delay }: IFadeCarouselProps): JSX.Element => {
  return (
    <Swiper
      effect='fade'
      initialSlide={1}
      loop={true}
      modules={[Autoplay, EffectFade, Pagination]}
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
