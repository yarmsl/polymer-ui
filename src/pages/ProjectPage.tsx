import { FC, useMemo } from 'react';
import { useHistory } from 'react-router';

import Project from '~/modules/Projects/components/Project';
import { useGetProjectsDataQuery } from '~/store/Data';
import HelmetTitle from '~/UI/atoms/Helmet';

const ProjectPage: FC = () => {
  const router = useHistory();
  const { data, isLoading } = useGetProjectsDataQuery('');

  const project = useMemo(() => {
    if (!isLoading && router?.location?.pathname != null && data != null) {
      return data.find((project) => `/project/${project.slug}` === router.location.pathname);
    }
  }, [data, isLoading, router.location.pathname]);

  return (
    <>
      <HelmetTitle title={project?.title || 'Проект'} />
      <Project project={project} />
    </>
  );
};

export default ProjectPage;
