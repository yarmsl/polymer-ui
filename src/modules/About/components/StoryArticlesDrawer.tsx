import { Box, Skeleton } from '@mui/material';

import StoryArticleCard from './StoryArticleCard';
import { useGetStoryArticlesDataQuery } from '../../../store/Data';

const StoryArticlesDrawer = (): JSX.Element => {
  const { data: storyArticles, isLoading: isStoryArticlesLoading } =
    useGetStoryArticlesDataQuery('');

  return (
    <Box sx={styles.root}>
      {isStoryArticlesLoading &&
        [0, 1, 2].map((ph) => <Skeleton key={ph} height='30px' variant='text' width='100%' />)}
      {storyArticles?.map((stArt, i) => (
        <StoryArticleCard key={i} storyArticle={stArt} />
      ))}
    </Box>
  );
};

const styles: TStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    mb: '50px',
  },
};

export default StoryArticlesDrawer;
