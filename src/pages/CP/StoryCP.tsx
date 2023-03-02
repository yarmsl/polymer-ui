import { FC } from 'react';

import Story from '~/modules/ControlPanel/Story';
import ControlPanelPage from '~/UI/layouts/ControlPanelPage';

const StoryCP: FC = () => {
  return (
    <ControlPanelPage title='История компании'>
      <Story />
    </ControlPanelPage>
  );
};

export default StoryCP;
