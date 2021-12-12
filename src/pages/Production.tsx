import { ReactElement } from "react";
import HelmetTitle from "../layouts/Helmet";
import { Container } from "@mui/material";
// import { useGetProductionArticlesDataQuery } from "../store/Data";

const Production = (): ReactElement => {
  // const {data, isLoading} = useGetProductionArticlesDataQuery("")
  
  return (
    <>
      <HelmetTitle title="Производство" />
      <Container>Производство</Container>
    </>
  );
};

export default Production;
