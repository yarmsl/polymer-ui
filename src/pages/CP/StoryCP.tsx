import { Box } from "@mui/material";
import { ReactElement } from "react";
import AddStory from "../../components/controlPanel/Story/AddStory";
import EditStory from "../../components/controlPanel/Story/EditStory";

import HelmetTitle from "../../layouts/Helmet";

const StoryCP = (): ReactElement => {
  return (
    <>
      <HelmetTitle title="Исотрия компании" />
      <Box sx={styles.root}>
        <AddStory />
        <EditStory />
      </Box>
    </>
  );
};

const styles: TStyles = {
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

export default StoryCP;
