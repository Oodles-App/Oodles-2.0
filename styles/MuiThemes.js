import { createTheme } from "@mui/material";

export const chartsTheme = createTheme({
  palette: {
    primary: {
      light: "#0fffff",
      main: "#E42256",
      dark: "#00bdbd",
    },
    secondary: {
      light: "#E42256",
      main: "#E42256",
      dark: "#E42256",
    },
  },
});

export const editProfileTheme = createTheme({
  palette: {
    // primary: {
    //   main: "#00B1B0",
    //   dark: "#00B1B0",
    // },
    primary: {
      main: "#E42256",
      dark: "#E42256",
    },
    secondary: {
      main: "#E42256",
      dark: "#E42256",
    },
  },
  select: {
    "&:before": {
      borderColor: "#00B1B0",
    },
    "&:after": {
      borderColor: "#00B1B0",
    },
  },
});
