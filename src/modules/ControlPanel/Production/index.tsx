import { Divider } from '@mui/material';

import AddProductionArticle from './components/AddProductionArticle';
import AddStep from './components/AddStep';
import EditProductionArticle from './components/EditProductionArticle';
import EditStep from './components/EditStep';

const Production: React.FC = () => (
  <>
    <AddProductionArticle />
    <EditProductionArticle />
    <Divider
      sx={{
        width: '100%',
        m: '50px 0',
      }}
    />
    <AddStep />
    <EditStep />
  </>
);

export default Production;
