import { Box } from "@mui/material";
import { SxProps } from "@mui/system";
import { ReactElement } from "react";
import AddArticle from "../../components/controlPanel/Articles/AddArticle";
import EditArticle from "../../components/controlPanel/Articles/EditArticle";

import HelmetTitle from "../../layouts/Helmet";

const ArticlesCP = (): ReactElement => {
  return (
    <>
      <HelmetTitle title="Статьи - Промышленный дизайн" />
      <Box sx={styles.root}>
        <AddArticle />
        <EditArticle />
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

export default ArticlesCP;
