import { Box } from "@mui/material";
import { SxProps } from "@mui/system";
import { ReactElement } from "react";
import AddMail from "../../components/controlPanel/Mail/AddMail";
import EditMail from "../../components/controlPanel/Mail/EditMail";
import HelmetTitle from "../../layouts/Helmet";

const MailCP = (): ReactElement => {
  return (
    <>
      <HelmetTitle title="Почта" />
      <Box sx={styles.root}>
        <AddMail />
        <EditMail />
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
