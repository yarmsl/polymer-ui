import {
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  SwipeableDrawer,
} from "@mui/material";
import { Fragment, memo } from "react";
import { useHistory } from "react-router";
import { SERVER_URL } from "../lib/constants";
import { pages } from "./MainLayout";

interface IBurgerMenuProps {
  open: boolean;
  handle: () => void;
}

const BurgerMenu = ({ open, handle }: IBurgerMenuProps): JSX.Element => {
  const router = useHistory();
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onOpen={handle}
      onClose={handle}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      sx={{ opacity: 0.95 }}
    >
      <Box sx={styles.root}>
        <List sx={styles.list}>
          {pages.map((page, i) => (
            <Fragment key={i}>
              <ListItemButton
                sx={styles.listButton}
                onClick={() => {
                  router.push(page.path);
                  handle();
                }}
              >
                {page.title}
              </ListItemButton>
              <Divider />
            </Fragment>
          ))}
        </List>
        <ListItemButton
          component="a"
          href="tel:+73512604064"
          sx={styles.listButton}
        >
          +7 (351) 260-40-64
        </ListItemButton>
        <Button
          variant="contained"
          color="primary"
          size="large"
          href={`${SERVER_URL}/api/file`}
          sx={{ mt: "16px" }}
        >
          Скачайте презентацию
        </Button>
      </Box>
    </SwipeableDrawer>
  );
};

const styles: TStyles = {
  root: {
    width: "100%",
    pt: "62px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  listButton: {
    fontSize: "16px",
    color: "#515759",
    letterSpacing: "0.31em",
    textTransform: "uppercase",
    lineHeight: 1.8,
    p: "18px 24px",
  },
};

export default memo(BurgerMenu);
