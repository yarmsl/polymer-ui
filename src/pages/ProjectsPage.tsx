import { FC } from 'react';

import Projects from '~/modules/Projects';
import HelmetTitle from '~/UI/atoms/Helmet';

const ProjectsPage: FC = () => (
  <>
    <HelmetTitle title='Проекты' />
    <Projects />
  </>
);
export default ProjectsPage;
