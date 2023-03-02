import { Box, Button, Skeleton, Typography } from "@mui/material";
import { FC, memo, useMemo } from "react";
import { useHistory } from "react-router";
import { SERVER_URL } from "../lib/constants";

interface ITagCardProps {
  tag: ITagFull;
}

export const SkeletonTagCard = (): JSX.Element => {
  return (
    <Box sx={styles.root}>
      <Skeleton
        sx={{ mb: "16px" }}
        variant="text"
        width={"100%"}
        height={"32px"}
      />
      <Box sx={styles.photoes}>
        {[0, 1, 2, 3].map((ph) => (
          <Skeleton sx={styles.photo} key={ph} variant="rectangular" />
        ))}
      </Box>
      <Skeleton variant="rectangular" width={"100%"} height={36} />
    </Box>
  );
};

const TagCard: FC<ITagCardProps> = ({ tag }) => {
  const router = useHistory();
  const images = useMemo(() => {
    if (tag && Array.isArray(tag.projects) && tag.projects.length > 0) {
      return [...tag.projects]
        .sort((a, b) => a.order - b.order)
        .map((proj) => (proj.images.length > 0 ? proj.images[0] : ""))
        .slice(0, 4);
    } else {
      return [];
    }
  }, [tag]);

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title}>{tag.name}</Typography>
      <Box sx={styles.photoes}>
        {images?.map((img, i) => (
          <Box sx={styles.photo} key={i}>
            {<img src={`${SERVER_URL}/${img}`} alt="Проект" />}
          </Box>
        ))}
      </Box>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => router.push(`/tag/${tag.slug}`)}
      >
        Смотреть проекты
      </Button>
    </Box>
  );
};

const styles: TStyles = {
  root: {
    minWidth: "270px",
    width: "270px",
    maxWidth: "270px",
    boxSizing: "border-box",
    p: "0 30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    maxWidth: "100%",
    height: "32px",
    maxHeight: "32px",
    overflow: "hidden",
    textAlign: "center",
    textOverflow: "ellipsis",
    wordBreak: "break-all",
    whiteSpace: "nowrap",
    fontSize: "16px",
    fontWeight: 700,
    mb: "16px",
  },
  photoes: {
    width: "100%",
    height: "210px",
    mb: "30px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "space-between",
  },
  photo: {
    width: "100px",
    height: "100px",
    borderRadius: "5px",
    overflow: "hidden",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
  },
};

export default memo(TagCard);
