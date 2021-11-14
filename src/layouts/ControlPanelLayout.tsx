import { ReactElement } from "react";
import { Container } from "@mui/material";

const styles = {
  root: {
    width: "100%",
    height: "100%",
  } as const,
};

const ControlPanelLayout = ({ children }: Child): ReactElement => {
  return (
    <>
      <Container disableGutters sx={styles.root} maxWidth={false}>
        <>{children}</>
      </Container>
    </>
  );
};

export default ControlPanelLayout;
