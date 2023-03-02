import { FC } from 'react';

import Banners from '~/modules/ControlPanel/Banners';
import ControlPanelPage from '~/UI/layouts/ControlPanelPage';

const BannersCP: FC = () => {
  return (
    <ControlPanelPage title='Баннеры'>
      <Banners />
    </ControlPanelPage>
  );
};

export default BannersCP;
