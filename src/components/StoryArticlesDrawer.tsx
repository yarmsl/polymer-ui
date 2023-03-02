import { Box, Skeleton } from "@mui/material";
import { useGetStoryArticlesDataQuery } from "../store/Data";
import StoryArticleCard from "../components/StoryArticleCard";

const StoryArticlesDrawer = (): JSX.Element => {
  const { data: storyArticles, isLoading: isStoryArticlesLoading } =
    useGetStoryArticlesDataQuery("");

  return (
    <Box sx={styles.root}>
      {isStoryArticlesLoading &&
        [0, 1, 2].map((ph) => (
          <Skeleton key={ph} variant="text" width="100%" height="30px" />
        ))}
      {storyArticles?.map((stArt, i) => (
        <StoryArticleCard key={i} storyArticle={stArt} />
      ))}
    </Box>
  );
};

const styles: TStyles = {
  root: {
    display: "flex",
    flexDirection: "column",
    mb: "50px",
  },
};

export default StoryArticlesDrawer;
