import React from 'react';
import { useHistory } from 'react-router';

import { Box, Button, Container } from '@mui/material';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useMedia } from '~/lib/useMedia';
import ArticlePromDisCard from '~/modules/InDesEngineering/components/ArticlePromDisCard';
import TagCard, { SkeletonTagCard } from '~/modules/InDesEngineering/components/TagCard';
import { useGetArticlesDataQuery, useGetTagsDataQuery } from '~/store/Data';

const IndDesEngineering: React.FC = () => {
  const router = useHistory();
  const { data: tags, isLoading: isLoadingTags } = useGetTagsDataQuery('');
  const { data: articles } = useGetArticlesDataQuery('');
  const { matchesDesktop } = useMedia();
  return (
    <>
      <Box sx={styles.root}>
        {matchesDesktop && (
          <Box sx={styles.tags}>
            <Swiper modules={[Navigation]} navigation={true} slidesPerView={3} spaceBetween={0}>
              {isLoadingTags
                ? [0, 1, 2].map((ph) => (
                    <SwiperSlide key={ph}>
                      <SkeletonTagCard key={ph} />
                    </SwiperSlide>
                  ))
                : tags?.map((slide, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <TagCard tag={slide} />
                      </SwiperSlide>
                    );
                  })}
            </Swiper>
          </Box>
        )}
        {!matchesDesktop && (
          <Box sx={styles.tagsMobile}>
            {isLoadingTags
              ? [0, 1, 2].map((ph) => <SkeletonTagCard key={ph} />)
              : tags?.map((slide, i) => {
                  return <TagCard key={i} tag={slide} />;
                })}
          </Box>
        )}
      </Box>
      <Container maxWidth='md' sx={styles.articles} disableGutters>
        {articles?.map((article, i) => (
          <ArticlePromDisCard key={article._id} article={article} reverse={i % 2 === 0} />
        ))}
        <Button color='primary' variant='contained' onClick={() => router.goBack()}>
          Вернуться назад
        </Button>
      </Container>
    </>
  );
};
const styles: TStyles = {
  root: {
    maxWidth: '900px',
    width: '100%',
    display: 'flex',
    padding: '50px 0',
    flexDirection: 'column',
    alignItems: 'center',
    '& .swiper': {
      '&-slide': {
        minWidth: '210px',
        display: 'flex',
        justifyContent: 'center',
      },
      '&-button': {
        '&-prev': {
          left: '0px',
          color: 'secondary.main',
        },
        '&-next': {
          right: '0px',
          color: 'secondary.main',
        },
      },
    },
  },
  tags: {
    width: '100%',
    mb: '50px',
  },
  tagsMobile: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '&>*:not(:last-of-type)': {
      mb: '24px',
    },
  },
  articles: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    pb: '50px',
  },
};
export default React.memo(IndDesEngineering);
