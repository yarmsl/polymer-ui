import { Box, Button, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { SERVER_URL } from "../lib/constants";

const FeedBackDownload = (): JSX.Element => {
  return (
    <Box sx={styles.root}>
      <Typography variant="h5" component="p" color="white">
        Хотите узнать о нас больше?
      </Typography>
      <Button
        href={`${SERVER_URL}/api/file`}
        size="large"
        variant="contained"
        color="primary"
      >
        Скачайте презентацию
      </Button>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    maxWidth: "340px",
    minWidth: "320px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&>*:not(:last-child)": { mb: "12px" },
  },
};

export default FeedBackDownload;
