import { Box, Collapse, Divider, IconButton, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { memo, useState, useCallback, useMemo } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StepCardItem from "./StepCardItem";

interface ICollapseItem {
  article: IProductionArticle;
  open: boolean;
}

const CollapseItem = ({ article, open }: ICollapseItem): JSX.Element => {
  const [coll, setColl] = useState(open);
  const handleCollapse = useCallback(
    () => (coll ? setColl(false) : setColl(true)),
    [coll]
  );
  const sortedSteps = useMemo(
    () =>
      Array.isArray(article.steps) && article.steps.length > 0
        ? [...article.steps].sort((a, b) => a.order - b.order)
        : [],
    [article.steps]
  );
  return (
    <Box sx={styles.root}>
      <Box sx={styles.header} onClick={handleCollapse} >
        <Typography sx={styles.title} variant="h6">
          {article.title}
        </Typography>
        <IconButton
          size="small"
          sx={coll ? styles.up : styles.down}
          onClick={handleCollapse}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>

      <Collapse in={coll}>
        <Box sx={styles.collWrapper}>
          <Typography component="pre" sx={styles.content}>
            {article.content}
          </Typography>
          {sortedSteps?.map((step, i) => (
            <StepCardItem key={step._id} step={step} reverse={i % 2 === 0} />
          ))}
        </Box>
      </Collapse>
      {!coll && <Divider />}
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
  },
  header: {
    width: "100%",
    p: "3px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    maxWidth: "calc(100% - 40px)",
  },
  up: {
    transform: "rotate(180deg)",
  },
  down: {
    transform: "rotate(0deg)",
  },
  content: {
    fontSize: "17px",
    color: "#777777",
    whiteSpace: "pre-wrap",
    textAlign: "justify",
    p: "8px 0",
  },
  collWrapper: {
    display: "flex",
    flexDirection: "column",
  },
};

export default memo(CollapseItem);
