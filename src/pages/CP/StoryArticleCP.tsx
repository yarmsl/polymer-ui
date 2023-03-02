import { FC } from 'react';

import StoryArticle from '~/modules/ControlPanel/StoryArticle';
import ControlPanelPage from '~/UI/layouts/ControlPanelPage';

const StoryArticleCP: FC = () => {
  return (
    <ControlPanelPage title='Статьи - О компании'>
      <StoryArticle />
    </ControlPanelPage>
  );
};

export default StoryArticleCP;
