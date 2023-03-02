import { FC, memo, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFound from './pages/404';
import About from './pages/AboutPage';
import Contacts from './pages/ContactsPage';
import Customer from './pages/CustomerPage';
import Home from './pages/HomePage';
import IndDesEngineering from './pages/IndDesEngineeringPage';
import Production from './pages/ProductionPage';
import Project from './pages/ProjectPage';
import Projects from './pages/ProjectsPage';
import Tags from './pages/TagsPage';
import Loading from './UI/atoms/Loading';
import ScrollToTop from './UI/atoms/ScrollToTop';
import MainLayout from './UI/layouts/MainLayout';

const Auth = lazy(() => import('./pages/CP/AuthPage'));
const ControlPanelLayout = lazy(() => import('./UI/layouts/ControlPanelLayout'));
const ControlPanel = lazy(() => import('./pages/CP/ControlPanel'));
const UserManagment = lazy(() => import('./pages/CP/UserManagment'));
const TagsCP = lazy(() => import('./pages/CP/Tags'));
const CustomersCP = lazy(() => import('./pages/CP/CustomersCP'));
const ProjectsCP = lazy(() => import('./pages/CP/ProjectsCP'));
const BannersCP = lazy(() => import('./pages/CP/BannersCP'));
const PresentationCP = lazy(() => import('./pages/CP/PresentationCP'));
const MailCP = lazy(() => import('./pages/CP/MailCP'));
const ArticlesCP = lazy(() => import('./pages/CP/ArticlesCP'));
const ProductionCP = lazy(() => import('./pages/CP/ProductionCP'));
const StoryCP = lazy(() => import('./pages/CP/StoryCP'));
const StoryArticleCP = lazy(() => import('./pages/CP/StoryArticleCP'));
const VacancyCP = lazy(() => import('./pages/CP/VacancyCP'));
interface IRoutesProps {
  isAuth: boolean;
  role: RoleTypes;
}

const Routes: FC<IRoutesProps> = ({ isAuth, role }) => {
  return (
    <Switch>
      <Route
        path={[
          '/',
          '/indastrial_design_and_engineering',
          '/production',
          '/about',
          '/contacts',
          '/projects',
          '/customer/:slug',
          '/project/:slug',
          '/tag/:slug',
        ]}
        exact
      >
        <MainLayout>
          <ScrollToTop />
          <Switch>
            <Route component={Home} path='/' exact />
            <Route component={IndDesEngineering} path='/indastrial_design_and_engineering' exact />
            <Route component={Production} path='/production' exact />
            <Route component={About} path='/about' exact />
            <Route component={Contacts} path='/contacts' exact />
            <Route component={Projects} path='/projects' exact />
            <Route component={Customer} path='/customer/:slug' exact />
            <Route component={Project} path='/project/:slug' exact />
            <Route component={Tags} path='/tag/:slug' exact />
          </Switch>
        </MainLayout>
      </Route>

      <Route
        path={[
          '/control_panel',
          '/control_panel/user_managment',
          '/control_panel/tags',
          '/control_panel/customers',
          '/control_panel/projects',
          '/control_panel/banners',
          '/control_panel/mail',
          '/control_panel/presentation',
          '/control_panel/ind_des_engin_articles',
          '/control_panel/production',
          '/control_panel/stories',
          '/control_panel/story_articles',
          '/control_panel/vacancies',
        ]}
        exact
      >
        <Suspense fallback={<Loading />}>
          {isAuth ? (
            <ControlPanelLayout>
              <Switch>
                <Route component={ControlPanel} path='/control_panel' exact />
                {role !== 'user' && (
                  <Route component={UserManagment} path='/control_panel/user_managment' exact />
                )}
                <Route component={TagsCP} path='/control_panel/tags' exact />
                <Route component={CustomersCP} path='/control_panel/customers' exact />
                <Route component={ProjectsCP} path='/control_panel/projects' exact />
                <Route component={BannersCP} path='/control_panel/banners' exact />
                <Route component={MailCP} path='/control_panel/mail' exact />
                <Route component={PresentationCP} path='/control_panel/presentation' exact />
                <Route component={ArticlesCP} path='/control_panel/ind_des_engin_articles' exact />
                <Route component={ProductionCP} path='/control_panel/production' exact />
                <Route component={StoryCP} path='/control_panel/stories' exact />
                <Route component={StoryArticleCP} path='/control_panel/story_articles' exact />
                <Route component={VacancyCP} path='/control_panel/vacancies' exact />
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
