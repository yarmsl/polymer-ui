import { Box, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { memo } from "react";

interface IMainAboutMobileCardProps {
  about: { title: string; text: string; icon: JSX.Element };
}

const MainAboutMobileCard = ({
  about,
}: IMainAboutMobileCardProps): JSX.Element => {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Box sx={styles.icon}>{about.icon}</Box>
        <Typography sx={styles.title}>{about.title}</Typography>
      </Box>
      <Typography sx={styles.text}>{about.text}</Typography>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    minWidth: "50px",
    width: "50px",
    height: "50px",
    mr: "20px",
    mb: "16px",
    "& svg": {
      height: "100%",
      width: "100%",
    },
  },
  title: {
    fontSize: "16px",
    letterSpacing: "0.24em",
    fontWeight: 400,
    textTransform: "uppercase",
  },
  text: {
    fontSize: "14px",
    fontWeight: 400,
    color: "#777",
  },
};

export default memo(MainAboutMobileCard);
