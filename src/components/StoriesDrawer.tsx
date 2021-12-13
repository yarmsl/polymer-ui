import { useMemo } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { useGetStoriesDataQuery } from "../store/Data";
import StoryCard from "../components/StoryCard";
import { useMedia } from "../lib/useMedia";
import StoryCardMobile from "./StoryCardMobile";

const StoriesDrawer = (): JSX.Element => {
  const { data, isLoading } = useGetStoriesDataQuery("");
  const { matchesMobile } = useMedia();
  const sortedStories = useMemo(
    () =>
      Array.isArray(data) && data.length > 0
        ? [...data].sort((a, b) => a.from - b.from)
        : [],
    [data]
  );

  const leftColStories = useMemo(
    () => sortedStories?.filter((_, i) => i % 2 === 0) || [],
    [sortedStories]
  );
  const rightColStories = useMemo(
    () =>
      sortedStories.length > 1
        ? sortedStories?.filter((_, i) => i % 2 === 1) || []
        : [],
    [sortedStories]
  );

  return (
    <>
      {isLoading ? (
        [0, 1, 2, 3].map((ph) => (
          <Skeleton key={ph} variant="text" width="100%" height="30px" />
        ))
      ) : (
        <Typography sx={styles.title} variant="h5">
          История компании
        </Typography>
      )}
      {!matchesMobile && (
        <Box sx={styles.root}>
          <Box sx={styles.leftSt}>
            {leftColStories?.map((story) => (
              <StoryCard key={story._id} story={story} />
            ))}
          </Box>
          <Box sx={styles.rightSt}>
            {rightColStories?.map((story) => (
              <StoryCard key={story._id} story={story} />
            ))}
          </Box>
        </Box>
      )}
      {matchesMobile && (
        <Box sx={styles.mobRoot}>
          {sortedStories?.map((story) => (
            <StoryCardMobile key={story._id} story={story} />
          ))}
        </Box>
      )}
    </>
  );
};

const styles: Record<string, SxProps> = {
  title: {
    width: "100%",
    fontWeight: 700,
  },
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    m: "16px 0 50px",
  },
  leftSt: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    pr: "10px",
    "&>*:not(:last-of-type)": {
      mb: "20px",
    },
  },
  rightSt: {
    width: "50%",
    mt: "50px",
    display: "flex",
    flexDirection: "column",
    pl: "10px",
    "&>*:not(:last-of-type)": {
      mb: "20px",
    },
  },
  mobRoot: {
    m: "16px 0",
    "&>*:not(:last-of-type)": {
      mb: "12px",
    },
  },
};

export default StoriesDrawer;
