import { Backdrop, CircularProgress } from "@mui/material";
import { memo, ReactElement, Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/404";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Customer from "./pages/Customer";
import Home from "./pages/Home";
import IndDesEngineering from "./pages/IndDesEngineering";
import Production from "./pages/Production";
import Projects from "./pages/Projects";

const Auth = lazy(() => import("./pages/Auth"));
const ControlPanelLayout = lazy(() => import("./layouts/ControlPanelLayout"));
const ControlPanel = lazy(() => import("./pages/ControlPanel"));
const UserManagment = lazy(() => import("./pages/UserManagment"));
const Tags = lazy(() => import("./pages/Tags"));
interface IRoutesProps {
  isAuth: boolean;
  role: RoleTypes;
}

const Routes = ({ isAuth, role }: IRoutesProps): ReactElement => {
  return (
    <Switch>
      <Route
        exact
        path={[
          "/",
          "/indastrial_design_and_engineering",
          "/production",
          "/about",
          "/contacts",
          "/projects",
          "/customer/:id",
        ]}
      >
        <MainLayout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/indastrial_design_and_engineering"
              component={IndDesEngineering}
            />
            <Route exact path="/production" component={Production} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contacts" component={Contacts} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/customer/:id" component={Customer} />
          </Switch>
        </MainLayout>
      </Route>

      <Route exact path={["/control_panel", "/user_managment", "/tags"]}>
        <Suspense
          fallback={
            <Backdrop open={true}>
              <CircularProgress />
            </Backdrop>
          }
        >
          {isAuth ? (
            <ControlPanelLayout>
              <Switch>
                <Route exact path="/control_panel" component={ControlPanel} />
                {role !== "user" && (
                  <Route
                    exact
                    path="/user_managment"
                    component={UserManagment}
                  />
                )}
                <Route exact path="/tags" component={Tags} />
              </Switch>
            </ControlPanelLayout>
          ) : (
            <Route component={Auth} />
          )}
        </Suspense>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
};

export default memo(Routes);
