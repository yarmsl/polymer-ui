import { FC } from 'react';

import Articles from '~/modules/ControlPanel/Articles';
import ControlPanelPage from '~/UI/layouts/ControlPanelPage';

const ArticlesCP: FC = () => {
  return (
    <ControlPanelPage title='Статьи - Промышленный дизайн'>
      <Articles />
    </ControlPanelPage>
  );
};

export default ArticlesCP;
