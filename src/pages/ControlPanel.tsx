import { ReactElement, useMemo, useState } from "react";
import HelmetTitle from "../layouts/Helmet";
import {
  AppBar,
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import CreateUser from "../components/controlPanel/CreateUser";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import { useAppDispatch, useAppSelector } from "../store";
import EditUsers from "../components/controlPanel/EditUsers";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { changePage } from "../store/UI";

interface IPages {
  id: controlPanelPageTypes;
  title: string;
  icon: JSX.Element;
  content: JSX.Element;
  access: RoleTypes;
}

const pages: IPages[] = [
  {
    id: "createuser",
    title: "Создание нового пользователя",
    icon: <GroupAddRoundedIcon />,
    content: <CreateUser />,
    access: "admin",
  },
  {
    id: "editusers",
    title: "Управление пользователями",
    icon: <GroupRoundedIcon />,
    content: <EditUsers />,
    access: "admin",
  },
];

const ControlPanel = (): ReactElement => {
  const dispatch = useAppDispatch();
  const [burger, setBurger] = useState(false);
  const { controlPanelPage } = useAppSelector((st) => st.UI);
  const { role } = useAppSelector((st) => st.auth);
  const filteredAuthPages = useMemo(
    () =>
      role === "user" ? pages.filter((page) => page.access === "user") : pages,
    [role]
  );
  const page = useMemo(
    () =>
      filteredAuthPages?.filter((item) => item.id === controlPanelPage)[0] || (
        <Typography>404</Typography>
      ),
    [controlPanelPage, filteredAuthPages]
  );
  return (
    <>
      <HelmetTitle title="Панель управления" />
      <SwipeableDrawer
        open={burger}
        onOpen={() => setBurger((p) => !p)}
        onClose={() => setBurger((p) => !p)}
      >
        <List>
          {filteredAuthPages?.map((item, i) => {
            return (
              <ListItemButton
                key={i}
                onClick={() => dispatch(changePage(item.id))}
                selected={page.id === item.id}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
              </ListItemButton>
            );
          })}
        </List>
      </SwipeableDrawer>
      <AppBar>
        <Toolbar>
          <IconButton
            onClick={() => setBurger((p) => !p)}
            color="inherit"
            size="large"
          >
            <MenuRoundedIcon />
          </IconButton>
          <Typography sx={{ ml: "32px" }} variant="h5">
            {page.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={styles.root}>{page.content}</Box>
    </>
  );
};

const styles = {
  root: {
    width: "100%",
    minHeight: "calc(100% - 64px)",
    height: "auto",
    mt: "64px",
    p: "32px 0",
    display: "flex",
    flexDirection: "column",
    "&>*:not(:last-child)": {
      mb: "16px",
    },
  } as const,
};

export default ControlPanel;
