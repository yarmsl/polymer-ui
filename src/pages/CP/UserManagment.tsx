import { FC } from 'react';

import User from '~/modules/ControlPanel/User';
import ControlPanelPage from '~/UI/layouts/ControlPanelPage';

const UserManagment: FC = () => {
  return (
    <ControlPanelPage title='Управление Пользователями'>
      <User />
    </ControlPanelPage>
  );
};

export default UserManagment;
