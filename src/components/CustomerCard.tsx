import { Box, Button, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { FC, memo, useMemo } from "react";
import { useHistory } from "react-router";
import { SERVER_URL } from "../lib/constants";

interface ICustomCardProps {
  customer: ICustomerFull;
}

const CustomerCard: FC<ICustomCardProps> = ({ customer }) => {
  const router = useHistory();
  const images = useMemo(() => {
    const imgArrs = customer?.projects?.map((proj) => proj.images);
    if (imgArrs.length > 0) {
      const res = imgArrs.map((img) => img[0]);
      if (res.length > 4) {
        return res.slice(3);
      } else {
        return res;
      }
    } else {
      return [];
    }
  }, [customer]);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgWrapper}>
        <img src={`${SERVER_URL}/${customer.logo}`} alt={customer.name} />
      </Box>
      <Typography sx={styles.title}>{customer.name}</Typography>
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
        onClick={() => router.push("/")}
      >
        Смотреть проекты
      </Button>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "270px",
    maxWidth: '270px',
    boxSizing: 'border-box',
    p: "25px 30px 44px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    borderRadius: "5px",
  },
  imgWrapper: {
    width: "100%",
    height: "60px",
    mb: "5px",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      objectPosition: "center",
    },
  },
  title: {
    height: "32px",
    maxHeight: "32px",
    overflow: "hidden",
    textAlign: "center",
    fontSize: "11px",
  },
  photoes: {
    width: "100%",
    height: "210px",
    mb: "30px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: 'space-between',
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

export default memo(CustomerCard);
