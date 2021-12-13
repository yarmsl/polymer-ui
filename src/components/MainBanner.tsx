import { Box, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { useRouteMatch } from "react-router";
import MainSlider from "./MainSlider";
import promdis from "../assets/promdis.webp";
import projects from "../assets/projects.webp";
import production from "../assets/production.webp";
import about from "../assets/about.webp";

const bannerPaths = [
  "/indastrial_design_and_engineering",
  "/production",
  "/projects",
  "/about",
];

const banner = {
  "/indastrial_design_and_engineering": {
    title: "Промышленный дизайн и инжиниринг",
    text: "Процесс создания проекта от эскиза до серийного производства - важная часть развития не только одного конкретного продукта, но и научно-технической сферы. Мы работаем с продуктом от начала и до ввода в эксплуатацию: наша команда оперативно реагирует на запросы современной индустрии, глубоко погружается в процесс создания продукта.",
    image: promdis,
  },
  "/production": {
    title: "Производство",
    text: "УРАЛ-ПОЛИМЕР включает в себя четыре промышленных предприятия, расположенных на отдельных, независимых производственных площадях. Общая площадь производственных помещений составляет 11000 кв. м. Общая численность персонала – более 250 человек.",
    image: production,
  },
  "/projects": {
    title: "Проекты",
    text: "Дизайн и стилевые решения, разработка технологической, опытной и серийной подготовки, комплектация серийными деталями интерьера и экстерьера",
    image: projects,
  },
  "/about": {
    title: "",
    text: "",
    image: about,
  },
};

const MainBanner = (): JSX.Element => {
  const match = useRouteMatch();
  return (
    <Box sx={styles.root}>
      {match.path === "/" ? (
        <MainSlider />
      ) : (
        bannerPaths.includes(match.path) && (
          <Box sx={styles.banner}>
            <Box sx={styles.article}>
              <Typography sx={styles.title} variant="h3" color="white">
                {banner[match.path].title}
              </Typography>
              <Typography sx={styles.text} variant="h6" color="white">
                {banner[match.path].text}
              </Typography>
            </Box>
            <Box sx={styles.blackout}></Box>
            <img
              src={banner[match.path].image}
              alt={banner[match.path].title}
            />
          </Box>
        )
      )}
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    height: { xs: "300px", sm: "525px" },
    overflow: "hidden",
    position: "relative",
    display: "flex",
  },
  banner: {
    width: "100%",
    height: "100%",
    position: "relative",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
  },
  blackout: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(0,0,0, 0.7)",
    zIndex: 2,
  },
  article: {
    width: { xs: "90%", sm: "100%" },
    maxWidth: "872px",
    minWidth: "300px",
    position: "absolute",
    p: "0 10px",
    zIndex: 4,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  title: {
    fontSize: { xs: "18px", sm: "36px" },
  },
  text: {
    fontSize: { xs: "14px", sm: "18px" },
  },
};

export default MainBanner;
