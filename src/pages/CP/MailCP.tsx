import { FC } from 'react';

import Mail from '~/modules/ControlPanel/Mail';
import ControlPanelPage from '~/UI/layouts/ControlPanelPage';

const MailCP: FC = () => {
  return (
    <ControlPanelPage title='Почта'>
      <Mail />
    </ControlPanelPage>
  );
};

export default MailCP;
