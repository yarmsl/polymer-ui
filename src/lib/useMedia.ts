import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface mediaQueries {
  matchesTablet: boolean;
  matchesMobile: boolean;
  matchesDesktop: boolean;
  matchesHead: boolean;
}

export const useMedia = (): mediaQueries => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(
    theme.breakpoints.down(theme.breakpoints.values.sm)
  );
  const matchesTablet = useMediaQuery(
    theme.breakpoints.down(theme.breakpoints.values.md)
  );
  const matchesDesktop = useMediaQuery(
    theme.breakpoints.up(theme.breakpoints.values.md)
  );

  const matchesHead = useMediaQuery(theme.breakpoints.up(1080));
  return {
    matchesTablet,
    matchesMobile,
    matchesDesktop,
    matchesHead,
  };
};
