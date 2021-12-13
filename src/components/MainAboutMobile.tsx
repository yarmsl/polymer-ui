import { Box } from "@mui/material";
import { SxProps } from "@mui/system";
import { abouts } from "../lib/about";
import MainAboutMobileCard from "./MainAboutMobileCard";

const MainAboutMobile = (): JSX.Element => {
  return (
    <Box sx={styles.root}>
      {abouts.map((about, i) => (
        <MainAboutMobileCard key={i} about={about} />
      ))}
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    backgroundColor: "#F9F9F9",
    display: "flex",
    flexDirection: "column",
    p: "35px 30px",
    "&>*:not(:last-of-type)": {
      mb: "16px",
    },
  },
};

export default MainAboutMobile;
