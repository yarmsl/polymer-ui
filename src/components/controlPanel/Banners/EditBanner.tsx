import { Box, Container, LinearProgress, Typography } from "@mui/material";
import { useGetAllBannersQuery } from "../../../store/Banner";
import BannerCard from "./BannerCard";

const EditBanner = (): JSX.Element => {
  const { data, isLoading: isBannersLoading } = useGetAllBannersQuery("");

  return (
    <Container sx={styles.root} maxWidth="md">
      <Typography variant="h6" sx={{ mb: "12px" }}>
        Главный баннер
      </Typography>
      <Box sx={styles.progress}>{isBannersLoading && <LinearProgress />}</Box>
      {data?.map((banner) => (
        <BannerCard key={banner._id} banner={banner} />
      ))}
    </Container>
  );
};

const styles: TStyles = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  progress: {
    width: "100%",
    height: "2px",
    mb: "8px",
  },
};

export default EditBanner;
