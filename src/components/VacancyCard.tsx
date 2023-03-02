import { Box, Typography } from "@mui/material";
import { memo } from "react";

interface IVacancyCardProps {
  vacancy: IVacancy;
}

const VacancyCard = ({ vacancy }: IVacancyCardProps): JSX.Element => {
  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title} variant="h6">
        {vacancy.title}
      </Typography>
      <Typography sx={{ fontWeight: 700 }}>Требования:</Typography>
      <Typography sx={styles.content} component="pre">
        {vacancy.requirements}
      </Typography>
      <Typography>
        <b>Заработная плата от: </b>
        {vacancy.wage.toLocaleString("ru-RU", {
          style: "currency",
          currency: "RUB",
          maximumFractionDigits: 0,
        })}
      </Typography>
    </Box>
  );
};

const styles: TStyles = {
  root: {
    width: "100%",
    p: "30px",
    backgroundColor: "#f8f8f8",
    borderRadius: "10px",
    fontSize: "18px",
  },
  title: {
    color: "primary.main",
    mb: "18px",
    fontWeight: 700,
  },
  content: {
    color: "#777777",
    whiteSpace: "pre-wrap",
    mb: "18px",
  },
};

export default memo(VacancyCard);
