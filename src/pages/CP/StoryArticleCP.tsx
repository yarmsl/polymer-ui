import { Box } from "@mui/material";
import { SxProps } from "@mui/system";
import { ReactElement } from "react";
import AddStoryArticle from "../../components/controlPanel/StoryArticle/AddStoryArticle";
import EditStoryArticle from "../../components/controlPanel/StoryArticle/EditStoryArticle";

import HelmetTitle from "../../layouts/Helmet";

const StoryArticleCP = (): ReactElement => {
  return (
    <>
      <HelmetTitle title="Статьи - О компании" />
      <Box sx={styles.root}>
        <AddStoryArticle />
        <EditStoryArticle />
      </Box>
    </>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&>*": {
      m: "24px 0",
    },
  },
};

export default StoryArticleCP;
