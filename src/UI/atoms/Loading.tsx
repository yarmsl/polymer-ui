import { Backdrop, CircularProgress } from '@mui/material';

const Loading = (): JSX.Element => {
  return (
    <Backdrop open={true} sx={{ zIndex: 2000, backgroundColor: 'rgba(255, 255, 255, 0.75)' }}>
      <CircularProgress />
    </Backdrop>
  );
};

export default Loading;
