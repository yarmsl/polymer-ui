import { memo, ReactElement, Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Loading from "./layouts/Loading";
import MainLayout from "./layouts/MainLayout";
import ScrollToTop from "./lib/ScrollToTop";
import NotFound from "./pages/404";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Customer from "./pages/Customer";
import Home from "./pages/Home";
import IndDesEngineering from "./pages/IndDesEngineering";
import Production from "./pages/Production";
import Project from "./pages/Project";
import Projects from "./pages/Projects";

const Auth = lazy(() => import("./pages/Auth"));
const ControlPanelLayout = lazy(() => import("./layouts/ControlPanelLayout"));
const ControlPanel = lazy(() => import("./pages/CP/ControlPanel"));
const UserManagment = lazy(() => import("./pages/CP/UserManagment"));
const Tags = lazy(() => import("./pages/CP/Tags"));
const CustomersCP = lazy(() => import("./pages/CP/CustomersCP"));
const ProjectsCP = lazy(() => import("./pages/CP/ProjectsCP"));
const BannersCP = lazy(() => import("./pages/CP/BannersCP"));
const PresentationCP = lazy(() => import("./pages/CP/PresentationCP"));
const MailCP = lazy(() => import("./pages/CP/MailCP"));
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
          "/customer/:slug",
          "/project/:slug",
        ]}
      >
        <MainLayout>
          <ScrollToTop />
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
            <Route exact path="/customer/:slug" component={Customer} />
            <Route exact path="/project/:slug" component={Project} />
          </Switch>
        </MainLayout>
      </Route>

      <Route
        exact
        path={[
          "/control_panel",
          "/control_panel/user_managment",
          "/control_panel/tags",
          "/control_panel/customers",
          "/control_panel/projects",
          "/control_panel/banners",
          "/control_panel/mail",
          "/control_panel/presentation",
        ]}
      >
        <Suspense fallback={<Loading />}>
          {isAuth ? (
            <ControlPanelLayout>
              <Switch>
                <Route exact path="/control_panel" component={ControlPanel} />
                {role !== "user" && (
                  <Route
                    exact
                    path="/control_panel/user_managment"
                    component={UserManagment}
                  />
                )}
                <Route exact path="/control_panel/tags" component={Tags} />
                <Route
                  exact
                  path="/control_panel/customers"
                  component={CustomersCP}
                />
                <Route
                  exact
                  path="/control_panel/projects"
                  component={ProjectsCP}
                />
                <Route
                  exact
                  path="/control_panel/banners"
                  component={BannersCP}
                />
                <Route exact path="/control_panel/mail" component={MailCP} />
                <Route
                  exact
                  path="/control_panel/presentation"
                  component={PresentationCP}
                />
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
