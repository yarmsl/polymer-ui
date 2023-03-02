import { Box } from "@mui/material";
import { ReactElement } from "react";
import AddProject from "../../components/controlPanel/Project/AddProject";
import EditProject from "../../components/controlPanel/Project/EditProject";
import HelmetTitle from "../../layouts/Helmet";

const ProjectsCP = (): ReactElement => {
  return (
    <>
      <HelmetTitle title="Проекты" />
      <Box sx={styles.root}>
        <AddProject />
        <EditProject />
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

export default ProjectsCP;
