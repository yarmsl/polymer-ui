import { AppBar, Button, Container } from "@mui/material";
import { SxProps } from "@mui/system";
import { useHistory, useRouteMatch } from "react-router";
import Logo from "./Logo";
import { pages } from "./MainLayout";

const Header = (): JSX.Element => {
  const router = useHistory();
  const match = useRouteMatch();
  return (
    <AppBar enableColorOnDark position="sticky" color="default">
      <Container sx={styles.header}>
        <Logo />
        {pages.map((page, i) => (
          <Button
            color="inherit"
            key={i}
            onClick={() => router.push(page.path)}
            sx={
              match.path === page.path
                ? selected
                : page.title === "О компании"
                ? link
                : styles.button
            }
          >
            {page.title}
          </Button>
        ))}
        <Button color="inherit" sx={link} href="tel:+73512604064">
          +7 (351) 260-40-64
        </Button>
      </Container>
    </AppBar>
  );
};

const styles: Record<string, SxProps> = {
  header: {
    width: "100%",
    height: "62px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    height: "100%",
    borderRadius: 0,
    fontSize: "10px",
    color: "#777777",
    textTransform: "uppercase",
    letterSpacing: "3px",
  },
  phone: {
    whiteSpace: "nowrap",
  },
  selected: {
    color: "#000",
  },
};

const link = { ...styles.button, ...styles.phone };
const selected = { ...styles.button, ...styles.selected };
export default Header;
