import { FC } from 'react';

import Tags from '~/modules/Tags';
import HelmetTitle from '~/UI/atoms/Helmet';

const TagsPage: FC = () => (
  <>
    <HelmetTitle title='Проекты' />
    <Tags />
  </>
);
export default TagsPage;
