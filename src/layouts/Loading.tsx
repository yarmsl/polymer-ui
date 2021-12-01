import { Backdrop, CircularProgress } from "@mui/material";

const Loading = (): JSX.Element => {
  return (
    <Backdrop sx={{ zIndex: 2000 }} open={true}>
      <CircularProgress />
    </Backdrop>
  );
};

export default Loading;
