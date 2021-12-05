import { Box } from "@mui/material";
import { SxProps } from "@mui/system";
import { ReactElement } from "react";
import AddCustomer from "../../components/controlPanel/Customer/AddCustomer";
import EditCustomer from "../../components/controlPanel/Customer/EditCustomer";

import HelmetTitle from "../../layouts/Helmet";

const CustomersCP = (): ReactElement => {
  return (
    <>
      <HelmetTitle title="Заказчики" />
      <Box sx={styles.root}>
        <AddCustomer />
        <EditCustomer />
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

export default CustomersCP;
