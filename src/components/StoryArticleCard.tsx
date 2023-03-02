import { Box, Typography } from "@mui/material";
import { memo } from "react";

interface IStoryArticleCardProps {
  storyArticle: IStoryArticle;
}

const StoryArticleCard = ({
  storyArticle,
}: IStoryArticleCardProps): JSX.Element => {
  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title} variant="h5">
        {storyArticle.title}
      </Typography>
      <Typography sx={styles.content} component="pre">
        {storyArticle.content}
      </Typography>
    </Box>
  );
};

const styles: TStyles = {
  root: {
    width: "100%",
  },
  title: {
    fontWeight: 700,
    mt: "30px",
    mb: "16px",
  },
  content: {
    color: "#777777",
    whiteSpace: "pre-wrap",
    fontSize: { xs: "14px", sm: "18px" },
  },
};

export default memo(StoryArticleCard);
