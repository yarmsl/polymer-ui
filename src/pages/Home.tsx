import { ReactElement } from "react";
import HelmetTitle from "../layouts/Helmet";
import MainAbout from "../components/MainAbout";
import TrustUs from "../components/TrustUs";
import { useMedia } from "../lib/useMedia";
import MainAboutMobile from "../components/MainAboutMobile";

const Home = (): ReactElement => {
  const { matchesMobile } = useMedia();
  return (
    <>
      <HelmetTitle title="Главная" />
      {matchesMobile ? <MainAboutMobile /> : <MainAbout />}
      <TrustUs />
    </>
  );
};

export default Home;
