import { ReactElement } from "react";
import HelmetTitle from "../layouts/Helmet";
import { Box, Container, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import DownloadPres from "../components/DownloadPres";
import { ReactComponent as Logotype } from "../assets/Logo.svg";
import Map from "../components/Map";
import { useMedia } from "../lib/useMedia";

const Contacts = (): ReactElement => {
  const { matchesMobile } = useMedia();
  return (
    <>
      <HelmetTitle title="Контакты" />
      <Container sx={styles.root} maxWidth="md">
        <Box sx={styles.main}>
          <Box sx={styles.contacts}>
            <Typography sx={styles.pagetitle} gutterBottom variant="h6">
              Контакты
            </Typography>
            <Typography>ООО «Урал-Полимер»</Typography>
            <Typography>+7 (351) 260-40-64</Typography>
            <Typography>+7 (351) 269-97-89</Typography>
            <Typography>+7 (351) 269-97-91</Typography>
            <Typography>Info@polidor.ru</Typography>
            <Typography>avm@polidor.ru</Typography>
            <Typography>Адрес:</Typography>
          </Box>
          {!matchesMobile && (
            <Box sx={styles.rb}>
              <Box sx={styles.logo}>
                <Logotype />
                <Box sx={styles.title}>
                  <Typography color="MenuText">УРАЛ-ПОЛИМЕР</Typography>
                  <Typography color="MenuText">POLIDOR GROUP</Typography>
                </Box>
              </Box>
              <DownloadPres />
            </Box>
          )}
        </Box>
        {matchesMobile && <DownloadPres />}
      </Container>
      {!matchesMobile && <Map />}
    </>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    pt: "80px",
    pb: "50px",
  },
  main: {
    width: "100%",
    height: { xs: "250px", sm: "200px" },
    display: "flex",
    justifyContent: "space-between",
  },
  contacts: {
    maxWidth: "300px",
    display: "flex",
    flexDirection: "column",
    "&>p": {
      fontSize: { xs: "18px", sm: "" },
    },
  },
  pagetitle: {
    color: { xs: "primary.main", sm: "#000" },
  },
  rb: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  logo: {
    userSelect: "none",
    display: "flex",
    height: "55px",
    "& svg": {
      width: "55px",
      height: "100%",
    },
  },
  title: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    ml: "8px",
    "& p": {
      fontSize: "22px",
      lineHeight: "22px",
    },
    "& p:first-of-type": {
      fontWeight: 700,
    },
  },
};

export default Contacts;
