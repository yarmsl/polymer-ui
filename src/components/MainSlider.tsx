import { Box, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import FadeCarousel from "../UI/FadeCarousel/FadeCarousel";

const mock = [
  {
    text: "25 лет «УРАЛ–ПОЛИМЕР» проектирует и производит изделия из полимерных и композитных материалов для специальной техники, общественного транспорта, беспилотных летательных аппаратов, оборудования и станков.",
    image: "https://picsum.photos/id/2/1920/1080",
  },
  {
    text: "Работа над проектом начинается задолго до производства: рисуются эскизы, создаются модели для того, чтобы в полном объеме представить картину создаваемого объекта. вознаграждение",
    image: "https://picsum.photos/id/52/1920/1080",
  },
  {
    text: "Коммерческое Необходимые знания и опыт в области дизайна и создания изделий из композитов позволяют нам создавать конструкции практически любой сложности, которые обладают отличными техническими характеристиками и современным внешним видом.",
    image: "https://picsum.photos/id/13/1920/1080",
  },
];

interface IArticleSlide {
  text: string;
  image: string;
}

const ArticleSlide = ({ text, image }: IArticleSlide): JSX.Element => {
  return (
    <Box sx={styles.slide}>
      <Typography variant="h6" component="h2" color="white" sx={styles.article}>
        {text}
      </Typography>
      <Box sx={styles.blackout}></Box>
      <img src={image} alt="Статья" />
    </Box>
  );
};

const MainSlider = (): JSX.Element => {
  const slides = mock?.map((article, i) => (
    <ArticleSlide
      key={`article-${i}`}
      text={article.text}
      image={article.image}
    />
  ));
  return (
    <Box sx={styles.root}>
      <FadeCarousel slides={slides} delay={15000} />
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
  },
  slide: {
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
    backgroundColor: "rgba(0,0,0, 0.4)",
    zIndex: 2,
  },
  article: {
    width: "100%",
    maxWidth: "872px",
    minWidth: "300px",
    m: "0 10px",
    position: "absolute",
    zIndex: 4,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

export default MainSlider;
