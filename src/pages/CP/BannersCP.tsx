import { Box } from "@mui/material";
import { SxProps } from "@mui/system";
import { ReactElement } from "react";
import AddBanner from "../../components/controlPanel/Banners/AddBanner";
import ChooseBottomBanner from "../../components/controlPanel/Banners/ChooseBottomBanner";
import EditBanner from "../../components/controlPanel/Banners/EditBanner";
import HelmetTitle from "../../layouts/Helmet";

const BannersCP = (): ReactElement => {
  return (
    <>
      <HelmetTitle title="Баннеры" />
      <Box sx={styles.root}>
        <AddBanner />
        <ChooseBottomBanner />
        <EditBanner />
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

export default BannersCP;
