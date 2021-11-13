import { ReactElement } from "react";
import { Switch, Route } from "react-router-dom";
import NotFound from "./pages/404";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Contacts from "./pages/Contacts";
import ControlPanel from "./pages/ControlPanel";
import Home from "./pages/Home";
import IndDesEngineering from "./pages/IndDesEngineering";
import Production from "./pages/Production";
import Projects from "./pages/Projects";

export const useRoutes = (isAuth: boolean): ReactElement => {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/indastrial_design_and_engineering" component={IndDesEngineering} />
        <Route exact path="/production" component={Production} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contacts" component={Contacts} />
        <Route exact path="/projects/:id" component={Projects} />
        <Route exact path="/control_panel" component={isAuth ? ControlPanel : Auth} />
        <Route component={NotFound} />
      </Switch>
    );
  
};
