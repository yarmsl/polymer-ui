import { AppBar, Container } from "@mui/material";
import { SxProps } from "@mui/system";

const Header = (): JSX.Element => {
  return (
    <AppBar enableColorOnDark position="static">
      <Container sx={styles.header}>Header</Container>
    </AppBar>
  );
};

const styles: Record<string, SxProps> = {
  header: {
    height: "68px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
};

export default Header;
