import React from 'react';

import Home from '~/modules/Home';

import HelmetTitle from '../UI/atoms/Helmet';

const HomePage: React.FC = () => {
  return (
    <>
      <HelmetTitle title='Главная' />
      <Home />
    </>
  );
};

export default HomePage;
