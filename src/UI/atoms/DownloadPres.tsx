import { Box, Button, Typography } from '@mui/material';

import { SERVER_URL } from '~/lib/constants';

const DownloadPres = (): JSX.Element => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h6' gutterBottom>
        Хотите узнать о нас больше?
      </Typography>
      <Button color='primary' href={`${SERVER_URL}/api/file`} size='large' variant='contained'>
        Скачайте презентацию
      </Button>
    </Box>
  );
};

export default DownloadPres;
