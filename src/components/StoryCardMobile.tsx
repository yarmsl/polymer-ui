import { Box, Collapse, IconButton, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { memo, useCallback, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";

interface IStoryCardProps {
  story: IStory;
}

const StoryCardMobile = ({ story }: IStoryCardProps): JSX.Element => {
  const [coll, setColl] = useState(false);
  const handleCollapse = useCallback(
    () => (coll ? setColl(false) : setColl(true)),
    [coll]
  );
  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Typography sx={styles.title}>
          {story.to ? `${story.from} - ${story.to}` : story.from}
        </Typography>
        <IconButton size="small" onClick={handleCollapse}>
          {coll ? <CloseIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </Box>
      <Collapse in={coll}>
        <Typography sx={styles.content} component="pre">
          {story.content}
        </Typography>
      </Collapse>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    p: "5px 20px",
    backgroundColor: "#f8f8f8",
    borderRadius: "10px",
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    color: "primary.main",
    fontSize: "30px",
    fontWeight: 700,
  },
  content: {
    color: "#777777",
    whiteSpace: "pre-wrap",
    fontSize: "14px",
  },
};

export default memo(StoryCardMobile);
