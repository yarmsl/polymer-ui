import { memo, ReactElement } from "react";
import { Switch, Route } from "react-router-dom";
import ControlPanelLayout from "./layouts/ControlPanelLayout";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/404";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Contacts from "./pages/Contacts";
import ControlPanel from "./pages/ControlPanel";
import Home from "./pages/Home";
import IndDesEngineering from "./pages/IndDesEngineering";
import Production from "./pages/Production";
import Projects from "./pages/Projects";

interface IRoutesProps {
  isAuth: boolean;
}

const Routes = ({ isAuth }: IRoutesProps): ReactElement => {
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
          "/projects/:id",
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
            <Route exact path="/projects/:id" component={Projects} />
          </Switch>
        </MainLayout>
      </Route>
      <Route exact path={["/control_panel"]}>
        <Switch>
          <ControlPanelLayout>
            {isAuth ? (
              <Route exact path="/control_panel" component={ControlPanel} />
            ) : (
              <Route component={Auth} />
            )}
          </ControlPanelLayout>
        </Switch>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
};

export default memo(Routes);
