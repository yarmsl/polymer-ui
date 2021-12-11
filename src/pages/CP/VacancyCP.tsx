import { Box } from "@mui/material";
import { SxProps } from "@mui/system";
import { ReactElement } from "react";
import AddVacancy from "../../components/controlPanel/Vacancies/AddVacancy";
import EditVacancy from "../../components/controlPanel/Vacancies/EditVacancy";

import HelmetTitle from "../../layouts/Helmet";

const VacancyCP = (): ReactElement => {
  return (
    <>
      <HelmetTitle title="Вакансии" />
      <Box sx={styles.root}>
        <AddVacancy />
        <EditVacancy />
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

export default VacancyCP;
