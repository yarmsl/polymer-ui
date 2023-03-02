import { Box } from "@mui/material";
import { ReactElement } from "react";
import AddPresFile from "../../components/controlPanel/PresentationFile/AddPresFile";
import HelmetTitle from "../../layouts/Helmet";

const PresentationCP = (): ReactElement => {
  return (
    <>
      <HelmetTitle title="Файл презентации" />
      <Box sx={styles.root}>
        <AddPresFile />
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

export default PresentationCP;
