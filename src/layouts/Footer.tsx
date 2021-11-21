import { Box, Container } from "@mui/material";

const styles = {
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

const Footer = (): JSX.Element => {
  return (
    <Box sx={styles.footer} component="footer">
      <Container sx={styles.wrapper}></Container>
    </Box>
  );
};

export default Footer;
