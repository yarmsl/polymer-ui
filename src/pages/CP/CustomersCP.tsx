import { Box } from "@mui/material";
import { SxProps } from "@mui/system";
import { ReactElement } from "react";

import HelmetTitle from "../../layouts/Helmet";

const CustomersCP = (): ReactElement => {
  return (
    <>
      <HelmetTitle title="Заказчики" />
      <Box sx={styles.root}>Заказчики</Box>
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

export default CustomersCP;
