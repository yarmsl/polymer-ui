import { Box, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import CustomerCard from "./CustomerCard";

const customers = [
  {
    name: 'АО "РЖД" ',
    logo: "2133",
    projects: ["213213", "sdf23", "d234r2", "d23e2"],
  },
  {
    name: "АО НПК «Уралвагонзавод»",
    logo: "2133",
    projects: ["213213", "sdf23", "d234r2", "d23e2"],
  },
  {
    name: "ООО «Уральские локомотивы»",
    logo: "2133",
    projects: ["213213", "sdf23", "d234r2", "d23e2"],
  },
  {
    name: "ФГУП ПО «Уральский оптико-механический завод»",
    logo: "2133",
    projects: ["213213", "sdf23", "d234r2", "d23e2"],
  },
];

const TrustUs = (): JSX.Element => {
  return (
    <Box sx={styles.root}>
      <Typography>Нам доверяют</Typography>
      <Box sx={styles.customers}>
        {customers?.map((customer, i) => (
          <CustomerCard key={i} {...customer} loading={false} />
        ))}
      </Box>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    maxWidth: "950px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  customers: {
    width: "100%",
    display: "flex",
  },
};

export default TrustUs;
