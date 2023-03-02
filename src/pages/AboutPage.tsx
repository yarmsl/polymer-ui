import React from 'react';

import About from '~/modules/About';
import HelmetTitle from '~/UI/atoms/Helmet';

const AboutPage: React.FC = () => (
  <>
    <HelmetTitle title='О компании' />
    <About />
  </>
);
export default AboutPage;
