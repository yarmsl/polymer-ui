import { ReactElement } from "react";
import HelmetTitle from "../layouts/Helmet";
import MainAbout from "../components/MainAbout";
import TrustUs from "../components/TrustUs";

const Home = (): ReactElement => {
  return (
    <>
      <HelmetTitle title="Главная" />
      <MainAbout />
      <TrustUs />
    </>
  );
};

export default Home;
