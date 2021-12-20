import { useMemo } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { useGetVacanciesDataQuery } from "../store/Data";
import VacancyCard from "../components/VacancyCard";
import { useMedia } from "../lib/useMedia";

const VacanciesDrawer = (): JSX.Element => {
  const { data, isLoading } = useGetVacanciesDataQuery("");
  const { matchesMobile } = useMedia();
  const leftColVacancies = useMemo(
    () =>
      Array.isArray(data) && data.length > 0
        ? data.filter((_, i) => i % 2 === 0)
        : [],
    [data]
  );

  const rightColVacancies = useMemo(
    () =>
      Array.isArray(data) && data.length > 0
        ? data.filter((_, i) => i % 2 === 1)
        : [],
    [data]
  );

  return (
    <>
      {isLoading ? (
        <Skeleton variant="text" width="100%" height="30px" />
      ) : (
        data && data?.length > 0 && <Typography sx={styles.title} variant="h5">
          Вакансии
        </Typography>
      )}
      {!matchesMobile && (
        <Box sx={styles.root}>
          <Box sx={styles.leftSt}>
            {leftColVacancies?.map((vac) => (
              <VacancyCard key={vac._id} vacancy={vac} />
            ))}
          </Box>
          <Box sx={styles.rightSt}>
            {rightColVacancies?.map((vac) => (
              <VacancyCard key={vac._id} vacancy={vac} />
            ))}
          </Box>
        </Box>
      )}
      {matchesMobile && (
        <Box sx={styles.mobRoot}>
          {data?.map((vac) => (
            <VacancyCard key={vac._id} vacancy={vac} />
          ))}
        </Box>
      )}
    </>
  );
};

const styles: Record<string, SxProps> = {
  title: {
    width: "100%",
    fontWeight: 700,
  },
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    m: "16px 0 50px",
  },
  leftSt: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    pr: "10px",
    "&>*:not(:last-of-type)": {
      mb: "20px",
    },
  },
  rightSt: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    pl: "10px",
    "&>*:not(:last-of-type)": {
      mb: "20px",
    },
  },
  mobRoot: {
    m: "16px 0",
    "&>*:not(:last-of-type)": {
      mb: "12px",
    },
  },
};

export default VacanciesDrawer;
