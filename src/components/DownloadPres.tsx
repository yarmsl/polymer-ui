import { Box, Button, Typography } from "@mui/material";
import { SERVER_URL } from "../lib/constants";

const DownloadPres = (): JSX.Element => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography gutterBottom variant="h6">
        Хотите узнать о нас больше?
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        href={`${SERVER_URL}/api/file`}
      >
        Скачайте презентацию
      </Button>
    </Box>
  );
};

export default DownloadPres;
