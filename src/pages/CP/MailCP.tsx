import { Box } from "@mui/material";
import { SxProps } from "@mui/system";
import { ReactElement } from "react";
import HelmetTitle from "../../layouts/Helmet";

const MailCP = (): ReactElement => {
  return (
    <>
      <HelmetTitle title="Почта" />
      <Box sx={styles.root}>
            почта
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

export default MailCP;