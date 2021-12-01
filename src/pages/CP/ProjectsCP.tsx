import { Box } from "@mui/material";
import { SxProps } from "@mui/system";
import { ReactElement } from "react";

import HelmetTitle from "../../layouts/Helmet";

const ProjectsCP = (): ReactElement => {
  return (
    <>
      <HelmetTitle title="Проекты" />
      <Box sx={styles.root}>Проекты</Box>
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

export default ProjectsCP;
