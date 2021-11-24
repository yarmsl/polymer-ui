import { Box, Container } from "@mui/material";
import { SxProps } from "@mui/system";

const Footer = (): JSX.Element => {
  return (
    <Box sx={styles.footer} component="footer">
      <Container sx={styles.wrapper}></Container>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  footer: {
    height: "58px",
    backgroundColor: "secondary.light",
    color: "#fff",
    userSelect: "none",
  } as const,
  wrapper: {
    width: "100%",
    height: "100%",
  },
};

export default Footer;
