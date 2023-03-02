import { useMemo } from 'react';

import { Box, Skeleton } from '@mui/material';

import { useGetAllBannersQuery } from '~/modules/ControlPanel/Banners/store';
import FadeCarousel from '~/UI/molecules/FadeCarousel';

import MainArticleSlide from './MainArticleSlide';

const MainSlider = (): JSX.Element => {
  const { data, isLoading } = useGetAllBannersQuery('');

  const slides = useMemo(
    () =>
      data?.map((banner, i) => (
        <MainArticleSlide key={`article-${i}`} image={banner.image} text={banner.text} />
      )) || [],
    [data],
  );

  return (
    <Box sx={styles.root}>
      {isLoading && slides.length === 0 && (
        <Skeleton height={'100%'} variant='rectangular' width={'100%'} />
      )}
      <FadeCarousel delay={15000} slides={slides} />
    </Box>
  );
};

const styles: TStyles = {
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
  },
};

export default MainSlider;
