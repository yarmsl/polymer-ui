import { ReactElement } from "react";
import { Helmet } from "react-helmet-async";

const HelmetTitle = ({ title }: MetaLT): ReactElement => {
  return (
    <Helmet>
      <title>Урал Полимер | {title}</title>
    </Helmet>
  );
};

export default HelmetTitle;
