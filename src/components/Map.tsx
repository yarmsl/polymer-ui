import { Box } from "@mui/material";
import { SxProps } from "@mui/system";

const Map = (): JSX.Element => {
  return (
    <Box sx={styles.root}>
      <a
        href="https://yandex.ru/maps/56/chelyabinsk/?utm_medium=mapframe&utm_source=maps"
        style={{
          color: "#eee",
          fontSize: "12px",
          position: "absolute",
          top: "0px",
        }}
      >
        Челябинск
      </a>
      <a
        href="https://yandex.ru/maps/56/chelyabinsk/?ll=61.402554%2C55.159897&utm_medium=mapframe&utm_source=maps&z=11"
        style={{
          color: "#eee",
          fontSize: "12px",
          position: "absolute",
          top: "14px",
        }}
      >
        Яндекс.Карты — транспорт, навигация, поиск мест
      </a>
      <iframe
        title="yandexmap"
        src="https://yandex.ru/map-widget/v1/-/CBRwbJwgsA"
        width="100%"
        height="100%"
        frameBorder="1"
        allowFullScreen={true}
        style={{ position: "relative" }}
      ></iframe>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: "600px",
    outline: "none",
    "& iframe": {
      borderWidth: "0px",
    },
  },
};

export default Map;
