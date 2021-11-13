import { AppBar, Container } from "@mui/material";

const styles = {
  header: {
    height: "68px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
};

const Header = (): JSX.Element => {
  return (
    <AppBar enableColorOnDark position="static">
      <Container sx={styles.header}>Header</Container>
    </AppBar>
  );
};

export default Header;
