import { Box, IconButton, Paper } from "@mui/material";
import { memo } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import { SERVER_URL } from "../../lib/constants";

interface IImagesPreviewProps {
  sources: string[];
  remove: (n: number) => void;
  firstPlace?: (n: number) => void;
  path?: boolean;
}

interface IImgItemProps {
  src: string;
  n: number;
  remove: (n: number) => void;
  firstPlace?: (n: number) => void;
  path?: boolean;
}

const ImgItem = ({
  src,
  n,
  remove,
  firstPlace,
  path,
}: IImgItemProps): JSX.Element => (
  <Box sx={styles.imgitem}>
    <IconButton onClick={() => remove(n)} sx={styles.remove} size="small">
      <CloseRoundedIcon color="error" fontSize="small" />
    </IconButton>
    {firstPlace && (
      <IconButton onClick={() => firstPlace(n)} sx={styles.first} size="small">
        <SortRoundedIcon color="info" fontSize="small" />
      </IconButton>
    )}
    <img src={path ? `${SERVER_URL}/${src}` : src} alt="Предпросмотр" />
  </Box>
);

const ImagesPreview = ({
  sources,
  remove,
  firstPlace,
  path,
}: IImagesPreviewProps): JSX.Element => (
  <Paper sx={styles.preview}>
    {sources.length > 0 &&
      sources?.map((src, i) => (
        <ImgItem
          key={i}
          src={src}
          n={i}
          remove={remove}
          firstPlace={firstPlace}
          path={path}
        />
      ))}
  </Paper>
);

const styles: TStyles = {
  preview: {
    width: "100%",
    minHeight: "110px",
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
  },
  imgitem: {
    width: "89px",
    height: "100px",
    m: "5px",
    position: "relative",
    borderRadius: "4px",
    overflow: "hidden",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
  },
  remove: {
    position: "absolute",
    top: "2px",
    right: "2px",
    backgroundColor: "#fff",
  },
  first: {
    position: "absolute",
    bottom: "2px",
    right: "2px",
    backgroundColor: "#fff",
  },
};

export default memo(ImagesPreview);
