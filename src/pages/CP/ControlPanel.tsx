import { ReactElement } from "react";
import HelmetTitle from "../../layouts/Helmet";
import { Box, Typography } from "@mui/material";
import { SxProps } from "@mui/system";

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

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
  },
};

export default ControlPanel;
