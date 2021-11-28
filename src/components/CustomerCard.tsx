import { Box, Button, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { FC, memo } from "react";
import { useHistory } from "react-router";

interface ICustomCardProps {
  name: string;
  logo: string;
  projects: string[];
  loading: boolean;
}

const CustomerCard: FC<ICustomCardProps> = ({
  name,
  logo,
  projects,
  loading,
}) => {
  const router = useHistory();
  return (
    <Box sx={styles.root}>
      <Box>
        <img src={logo} alt={name} />
      </Box>
      <Typography>{name}</Typography>
      <Box>
        {projects?.map((project, i) => {
          return (
            <Box key={i}>
              <img src={project} alt={`project-${i + 1}`} />
            </Box>
          );
        })}
      </Box>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => router.push(`/customer/${(name)}`)}
      >
        Смотреть проекты
      </Button>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "270px",
    display: "flex",
    flexDirection: "column",
  },
};

export default memo(CustomerCard);
