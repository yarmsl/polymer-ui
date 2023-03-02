import { Box } from "@mui/material";
import { ReactElement } from "react";
import AddTag from "../../components/controlPanel/Tag/AddTag";
import EditTag from "../../components/controlPanel/Tag/EditTag";

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

export default Tags;
