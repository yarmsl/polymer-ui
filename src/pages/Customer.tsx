import { ReactElement, useMemo } from "react";
import HelmetTitle from "../layouts/Helmet";
import { Box, Button, Container, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { useHistory } from "react-router";
import { useGetCustomersDataQuery } from "../store/Data";
import { SERVER_URL } from "../lib/constants";
import JointProjectCard, {
  SkeletonJointProjectCard,
} from "../components/JointProjectCard";

const Customer = (): ReactElement => {
  const router = useHistory();
  const { data, isLoading } = useGetCustomersDataQuery("");

  const customer = useMemo(() => {
    if (!isLoading && data != null && router?.location?.pathname != null) {
      return data?.find(
        (customer) => `/customer/${customer.slug}` === router.location.pathname
      );
    }
  }, [data, isLoading, router.location.pathname]);

  return (
    <>
      <HelmetTitle
        title={`Совместные проекты${customer ? ` с ${customer.name}` : ""}`}
      />
      <Container maxWidth="md" sx={styles.root}>
        <Box sx={styles.header}>
          <Box sx={styles.title}>
            <Typography sx={styles.ht} variant="h3">
              Совместные проекты:
            </Typography>
            <Typography variant="h3">{customer?.name}</Typography>
            <Typography variant="subtitle1">{customer?.description}</Typography>
          </Box>
          <Box sx={styles.logo}>
            <img src={`${SERVER_URL}/${customer?.logo}`} alt="Лого" />
          </Box>
        </Box>
        <Box sx={styles.projects}>
          {isLoading
            ? [0, 1].map((ph) => <SkeletonJointProjectCard key={ph} />)
            : customer?.projects?.map((project) => (
                <JointProjectCard key={project._id} project={project} />
              ))}
        </Box>
        <Button
          onClick={() => router.goBack()}
          variant="contained"
          color="primary"
        >
          Вернуться назад
        </Button>
      </Container>
    </>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    p: "80px 0 110px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    width: "100%",

    display: "flex",
  },
  title: {
    flexGrow: 1,
    pr: "18px",
  },
  ht: {
    color: "primary.main",
    lineHeight: 1,
  },
  logo: {
    width: "25%",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      objectPosition: "center",
    },
  },
  projects: {
    width: "100%",
    p: "100px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&>*:not(:last-child)": {
      mb: "14px",
    },
  },
};

export default Customer;
