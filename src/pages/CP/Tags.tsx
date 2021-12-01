import { Box } from "@mui/material";
import { SxProps } from "@mui/system";
import { ReactElement } from "react";
import AddTag from "../../components/controlPanel/AddTag";
import EditTag from "../../components/controlPanel/EditTag";

import HelmetTitle from "../../layouts/Helmet";

const Tags = (): ReactElement => {
  return (
    <>
      <HelmetTitle title="Теги" />
      <Box sx={styles.root}>
        <AddTag />
        <EditTag />
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

export default Tags;
