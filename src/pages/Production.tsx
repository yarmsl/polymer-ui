import { ReactElement, useMemo } from "react";
import HelmetTitle from "../layouts/Helmet";
import { Button, Container, Skeleton, Typography } from "@mui/material";
import { useGetProductionArticlesDataQuery } from "../store/Data";
import { SxProps } from "@mui/system";
import { useHistory } from "react-router";
import CollapseItem from "../components/CollapseItem";

const Production = (): ReactElement => {
  const router = useHistory();
  const { data, isLoading } = useGetProductionArticlesDataQuery("");
  const sortdedData = useMemo(
    () =>
      Array.isArray(data) && data.length > 0
        ? [...data].sort((a, b) => a.order - b.order)
        : [],
    [data]
  );

  return (
    <>
      <HelmetTitle title="Производство" />
      <Container sx={styles.root} maxWidth="md">
        {isLoading &&
          [0, 1, 2, 3, 4, 5].map((ph) => (
            <Skeleton key={ph} variant="text" width={"100%"} />
          ))}
        {sortdedData?.map((article) => {
          if (article.content === "") {
            return (
              <Typography key={article._id} variant="h5" sx={styles.title}>
                {article.title}
              </Typography>
            );
          } else {
            return (
              <CollapseItem key={article._id} article={article} open={false} />
            );
          }
        })}
        <Button
          sx={{ mt: "90px" }}
          onClick={() => router.goBack()}
          variant="contained"
          color="primary"
        >
          Вернуться назад
        </Button>
      </Container>
    </>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    pt: "50px",
    pb: "90px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    width: "100%",
    m: "24px 0",
    fontWeight: 700,
  },
};

export default Production;
