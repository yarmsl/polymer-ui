import { Box, Button, TextField, Typography } from "@mui/material";
import { SxProps } from "@mui/system";

const GetPresentationByEmail = (): JSX.Element => {
  return (
    <Box sx={styles.root}>
      <Typography align="center">
        Получить презентацию на электронную почту
      </Typography>
      <TextField label="Ваша электронная почта" size="small" color="secondary"/>
      <Button variant="contained" color="secondary">
        Получить
      </Button>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "195px",
    display: "flex",
    flexDirection: "column",
    "&>*:not(:last-child)": {
      mb: "8px",
    },
  },
};

export default GetPresentationByEmail;
