import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { SERVER_URL } from "../lib/constants";
import { SxProps } from "@mui/system";

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
      <img src={`${SERVER_URL}/${image}`} alt="Статья" />
    </Box>
  );
};

const styles: Record<string, SxProps> = {
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
    width: { xs: "90%", sm: "100%" },
    maxWidth: "872px",
    minWidth: "300px",
    m: "0 10px",
    position: "absolute",
    zIndex: 4,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: { xs: "14px", sm: "18px" },
  },
};

export default memo(ArticleSlide);
