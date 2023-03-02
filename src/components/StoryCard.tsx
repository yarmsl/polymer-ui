import { Box, Typography } from "@mui/material";
import { memo } from "react";

interface IStoryCardProps {
  story: IStory;
}

const StoryCard = ({ story }: IStoryCardProps): JSX.Element => {
  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title} variant="h2">
        {story.to ? `${story.from} - ${story.to}` : story.from}
      </Typography>
      <Typography sx={styles.content} component="pre">
        {story.content}
      </Typography>
    </Box>
  );
};

const styles: TStyles = {
  root: {
    width: "100%",
    p: "30px",
    backgroundColor: "#f8f8f8",
    borderRadius: "10px",
  },
  title: {
    color: "primary.main",
    mb: "10px",
  },
  content: {
    color: "#777777",
    whiteSpace: "pre-wrap",
    fontSize: "16px",
  },
};

export default memo(StoryCard);
