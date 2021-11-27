import { Box, Button, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { useHistory } from "react-router";
import { ReactComponent as Logotype } from "../assets/Logo.svg";

const Logo = (): JSX.Element => {
  const router = useHistory();
  return (
    <Button color="inherit" onClick={() => router.push("/")} sx={styles.root}>
      <Logotype />
      <Box sx={styles.title}>
        <Typography color="MenuText">УРАЛ-ПОЛИМЕР</Typography>
        <Typography color="MenuText">POLIDOR GROUP</Typography>
      </Box>
    </Button>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    minWidth: "160px",
    height: "100%",
    p: "16px 4px",
    display: "flex",
    borderRadius: 0,
    userSelect: "none",
  },
  title: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    ml: "8px",
    "& p": {
      fontSize: "14px",
      lineHeight: "14px",
    },
    "& p:first-of-type": {
      fontWeight: 700,
    },
  },
};

export default Logo;
