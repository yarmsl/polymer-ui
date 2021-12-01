import { ReactElement, useMemo, useState } from "react";
import {
  AppBar,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import TagIcon from '@mui/icons-material/Tag';
import { useHistory, useRouteMatch } from "react-router";
import { useAppSelector } from "../store";
import { SxProps } from "@mui/system";
import { ReactComponent as Logo } from "../assets/Logo.svg";

const pages = [
  {
    title: "Панель Управления",
    path: "/control_panel",
    icon: <AdminPanelSettingsRoundedIcon />,
    access: "user",
  },
  {
    title: "Управление Пользователями",
    path: "/control_panel/user_managment",
    icon: <GroupRoundedIcon />,
    access: "admin",
  },
  {
    title: "Теги (Проекты)",
    path: "/control_panel/tags",
    icon: <TagIcon />,
    access: "user",
  },
  {
    title: "Заказчики (Проекты)",
    path: "/control_panel/customers",
    icon: <AssignmentIndRoundedIcon />,
    access: "user",
  },
  {
    title: "Проекты",
    path: "/control_panel/projects",
    icon: <EngineeringRoundedIcon />,
    access: "user",
  }
];

const ControlPanelLayout = ({ children }: Child): ReactElement => {
  const { role } = useAppSelector((st) => st.auth);
  const [burger, setBurger] = useState(false);
  const router = useHistory();
  const match = useRouteMatch();
  const title = useMemo(
    () =>
      pages?.find((page) => page.path === match.path)?.title ||
      "Панель Управления",
    [match]
  );

  return (
    <Container disableGutters sx={styles.root} maxWidth={false}>
      <AppBar>
        <Toolbar>
          <IconButton onClick={() => setBurger((p) => !p)} size="large">
            <MenuRoundedIcon />
          </IconButton>
          <Typography color="gray" sx={{ ml: "32px" }} variant="h5">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        open={burger}
        onOpen={() => setBurger((p) => !p)}
        onClose={() => setBurger((p) => !p)}
      >
        <List>
          <ListItem sx={styles.back}>
            <IconButton onClick={() => router.push("/")}>
              <Logo />
            </IconButton>
            <IconButton onClick={() => setBurger((p) => !p)} size="large">
              <ArrowBackRoundedIcon />
            </IconButton>
          </ListItem>
          {pages?.map((page, i) => {
            return (
              <ListItemButton
                key={`page-${i}`}
                onClick={() => router.push(page.path)}
                selected={match.path === page.path}
                disabled={page.access === "admin" && role === "user"}
              >
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText>{page.title}</ListItemText>
              </ListItemButton>
            );
          })}
        </List>
      </SwipeableDrawer>
      <>{children}</>
    </Container>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    height: "auto",
    pt: "64px",
  },
  back: {
    height: "56px",
    display: "flex",
    justifyContent: "space-between",
  } as const,
};

export default ControlPanelLayout;
