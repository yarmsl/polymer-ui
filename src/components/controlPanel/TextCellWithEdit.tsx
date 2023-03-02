import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

interface ITextCellWithEditProps<T> {
  val: string | number | string[];
  openModal: (edit: T) => void;
  edit: T;
}

function TextCellWithEdit<T>({
  val,
  openModal,
  edit,
}: ITextCellWithEditProps<T>): JSX.Element {
  return (
    <Box sx={styles.textCell}>
      <Tooltip arrow title={Array.isArray(val) ? val.join(", ") : val}>
        <Typography variant="body2" sx={styles.long}>
          {Array.isArray(val) ? val.join(", ") : val}
        </Typography>
      </Tooltip>
      <IconButton onClick={() => openModal(edit)} size="small">
        <EditRoundedIcon fontSize="inherit" color="warning" />
      </IconButton>
    </Box>
  );
}

const styles: TStyles = {
  textCell: {
    maxWidth: "150px",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  long: {
    width: "calc(100% - 36px)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordBreak: "break-all",
    whiteSpace: "nowrap",
    mr: "8px",
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
};

export default TextCellWithEdit;
