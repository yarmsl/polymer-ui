import React from 'react';

import { Box } from '@mui/material';

import HelmetTitle from '../../UI/atoms/Helmet';

interface IControlPanelPageProps {
  title?: string;
  children?: React.ReactNode;
}

const ControlPanelPage: React.FC<IControlPanelPageProps> = ({ title = '', children }) => {
  return (
    <>
      <HelmetTitle title={title} />
      <Box sx={styles.root}>{children}</Box>
    </>
  );
};

const styles: TStyles = {
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '&>*': {
      m: '24px 0',
    },
  },
};

export default React.memo(ControlPanelPage);
