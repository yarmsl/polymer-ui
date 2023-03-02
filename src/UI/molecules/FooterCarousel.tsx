import { useMemo } from 'react';
import { useRouteMatch } from 'react-router';

import { Box, Skeleton } from '@mui/material';

import { useMedia } from '~/lib/useMedia';
import { useGetBottomBannerQuery } from '~/modules/ControlPanel/Banners/store';
import { useGetProjectsDataQuery } from '~/store/Data';
import FeedBackDownload from '~/UI/atoms/FeedBackDownload';
import FeedbackForm from '~/UI/atoms/FeedbackForm';
import ProjectSlide from '~/UI/atoms/ProjectSlide';
import FadeCarousel from '~/UI/molecules/FadeCarousel';

const FooterCarousel = (): JSX.Element => {
  const match = useRouteMatch();
  const { data: projects, isLoading: isProjectsLoading } = useGetProjectsDataQuery('');
  const { data: bottomBanner, isLoading: isBottomBannerLoading } = useGetBottomBannerQuery('');
  const { matchesMobile } = useMedia();
  const filteredProjects = useMemo(
    () => projects?.filter((proj) => bottomBanner?.projects?.includes(proj._id)) || [],
    [bottomBanner, projects],
  );

  const slides = useMemo(
    () =>
      filteredProjects?.map((project, i) => (
        <ProjectSlide
          key={`proj-${i}`}
          project={project}
          showDescription={match.path !== '/contacts' && !matchesMobile}
        />
      )) || [],
    [filteredProjects, match.path, matchesMobile],
  );

  return (
    <Box
      sx={{
        ...styles.root,
        height: {
          xs: match.path === '/contacts' ? '525px' : '210px',
          sm: '525px',
        },
      }}
    >
      <Box sx={styles.feedback}>
        {match.path !== '/contacts' ? <FeedBackDownload /> : <FeedbackForm />}
      </Box>
      {isProjectsLoading && isBottomBannerLoading && filteredProjects.length === 0 && (
        <Skeleton height={'100%'} variant='rectangular' width={'100%'} />
      )}
      <FadeCarousel delay={15000} slides={slides} />
    </Box>
  );
};

const styles: TStyles = {
  root: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  feedback: {
    position: 'absolute',
    zIndex: 4,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default FooterCarousel;
