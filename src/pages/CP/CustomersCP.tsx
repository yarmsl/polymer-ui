import { FC } from 'react';

import Customer from '~/modules/ControlPanel/Customer';
import ControlPanelPage from '~/UI/layouts/ControlPanelPage';

const CustomersCP: FC = () => {
  return (
    <ControlPanelPage title='Заказчики'>
      <Customer />
    </ControlPanelPage>
  );
};

export default CustomersCP;
