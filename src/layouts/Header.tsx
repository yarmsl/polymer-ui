import { AppBar, Button, Container, IconButton } from "@mui/material";
import { SxProps } from "@mui/system";
import { useHistory, useRouteMatch } from "react-router";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./Logo";
import { pages } from "./MainLayout";
import { useMedia } from "../lib/useMedia";
import { useCallback, useMemo, useState } from "react";
import BurgerMenu from "./BurgerMenu";
import CloseIcon from "@mui/icons-material/Close";

const Header = (): JSX.Element => {
  const router = useHistory();
  const match = useRouteMatch();
  const [burger, setBurger] = useState(false);

  const handleBurger = useCallback(
    () => (burger ? setBurger(false) : setBurger(true)),
    [burger]
  );

  const closeBurger = useCallback(() => setBurger(false), []);

  const open = useMemo(() => burger, [burger]);

  const { matchesHead, matchesTablet } = useMedia();
  return (
    <>
      <AppBar
        sx={{ zIndex: 2000, boxShadow: burger ? "none" : "" }}
        enableColorOnDark
        position="sticky"
        color="default"
      >
        <Container sx={styles.header}>
          <Logo closeBurger={closeBurger} />
          {!matchesTablet && (
            <>
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
                {matchesHead ? (
                  "+7 (351) 260-40-64"
                ) : (
                  <PhoneEnabledIcon fontSize="small" />
                )}
              </Button>
            </>
          )}
          {matchesTablet && (
            <IconButton onClick={handleBurger}>
              {burger ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
        </Container>
      </AppBar>
      {matchesTablet && <BurgerMenu open={open} handle={handleBurger} />}
    </>
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
    letterSpacing: { sm: "2px", md: "3px" },
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
