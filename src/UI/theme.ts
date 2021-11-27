import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const defaultTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1366,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: "PT Root UI",
    button: {
      textTransform: "none",
    },
    h5: {
      fontSize: 24,
      fontWeight: 500,
      userSelect: 'none'
    },
    h6: {
      fontSize: 18,
      fontWeight: 500,
      userSelect: 'none'
    },
    body1: {
      fontSize: 14,
    },
    body2: {
      fontSize: 10,
      fontWeight: 500,
    },
  },
  palette: {
    primary: {
      // dark: "#00695f",
      main: "#D13239",
      light: "#FF1C26",
      contrastText: "#fff",
    },
    secondary: {
      // dark: "#00a152",
      main: "#C4C4C4",
      light: "#F9F9F9",
      contrastText: "#fff",
    },
  },
  // shadows: [
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none', //используется выпадашки из селектов TextField
  // 	'none',
  // 	'none',
  // 	'0px 0px 16px rgba(0, 0, 0, 0.25)',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none'
  // ],
  shape: {
    borderRadius: 5,
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          display: "flex",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#FF1C26",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "#e9e9e9",
          borderRadius: "8px",
        },
        html: {
          width: "100%",
          height: "100%",
        },
        body: {
          width: "100%",
          height: "100%",
        },
        input: {
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 30px #fafafa inset !important",
          },
        },
        img: {
          pointerEvents: "none",
          userSelect: "none",
        },
        "#root": {
          display: "flex",
          flexDirection: "column",
          width: "100%",
          minWidth: "320px",
          minHeight: "100%",
        },
      },
    },
  },
});

const theme = responsiveFontSizes(defaultTheme);

export default theme;
