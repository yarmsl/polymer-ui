import { FC } from 'react';

import PresentationFile from '~/modules/ControlPanel/PresentationFile';
import ControlPanelPage from '~/UI/layouts/ControlPanelPage';

const PresentationCP: FC = () => {
  return (
    <ControlPanelPage title='Файл презентации'>
      <PresentationFile />
    </ControlPanelPage>
  );
};

export default PresentationCP;
