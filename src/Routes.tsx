import { memo, ReactElement } from "react";
import { Switch, Route } from "react-router-dom";
import ControlPanelLayout from "./layouts/ControlPanelLayout";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/404";
import NotFoundCP from "./pages/404Cp";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Contacts from "./pages/Contacts";
import ControlPanel from "./pages/ControlPanel";
import Home from "./pages/Home";
import IndDesEngineering from "./pages/IndDesEngineering";
import Production from "./pages/Production";
import Projects from "./pages/Projects";
import UserManagment from "./pages/UserManagment";

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
            <Route path="/projects" component={Projects} />
          </Switch>
        </MainLayout>
      </Route>
      <Route component={NotFound} />
      {isAuth ? (
        <Route exact path={["/control_panel", "/user_managment"]}>
          <ControlPanelLayout>
            <Switch>
              <Route exact path="/control_panel" component={ControlPanel} />
              {role !== "user" && (
                <Route exact path="/user_managment" component={UserManagment} />
              )}
              <Route component={NotFoundCP} />
            </Switch>
          </ControlPanelLayout>
        </Route>
      ) : (
        <Route component={Auth} />
      )}
      
    </Switch>
  );
};

export default memo(Routes);
