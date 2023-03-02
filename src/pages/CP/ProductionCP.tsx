import { Box, Divider } from "@mui/material";
import { ReactElement } from "react";
import AddProductionArticle from "../../components/controlPanel/Production/AddProductionArticle";
import AddStep from "../../components/controlPanel/Production/AddStep";
import EditProductionArticle from "../../components/controlPanel/Production/EditProductionArticle";
import EditStep from "../../components/controlPanel/Production/EditStep";

import HelmetTitle from "../../layouts/Helmet";

const ProductionCP = (): ReactElement => {
  return (
    <>
      <HelmetTitle title="Статьи - Производство" />
      <Box sx={styles.root}>
        <AddProductionArticle />
        <EditProductionArticle />
        <Divider sx={styles.divider} />
        <AddStep />
        <EditStep />
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
  divider: {
    width: "100%",
    m: "50px 0",
  },
};

export default ProductionCP;
