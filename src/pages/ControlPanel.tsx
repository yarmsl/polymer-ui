import { ReactElement } from "react";
import HelmetTitle from "../layouts/Helmet";
import { Box, Typography } from "@mui/material";

const ControlPanel = (): ReactElement => {
  return (
    <>
      <HelmetTitle title="Панель управления" />
      <Box sx={styles.root}>
        <Typography>Добро пожаловать в панель управления</Typography>
      </Box>
    </>
  );
};

const styles = {
  root: {
    width: "100%",
  } as const,
};

export default ControlPanel;
