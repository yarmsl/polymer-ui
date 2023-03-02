import React from 'react';

import Production from '~/modules/Production';
import HelmetTitle from '~/UI/atoms/Helmet';

const ProductionPage: React.FC = () => (
  <>
    <HelmetTitle title='Производство' />
    <Production />
  </>
);
export default ProductionPage;
