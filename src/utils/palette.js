import { alpha } from "@mui/material/styles";
import {
  brown,
  amber,
  yellow,
  green,
  purple,
  pink,
  deepPurple,
  lightGreen,
} from "@mui/material/colors";
export const palette = {
  lemon: {
    primary: {
      main: yellow[300],
      light: alpha(yellow[50], 0.8),
      dark: yellow["A700"],
      contrastText: alpha(green[900], 0.7),
    },
    secondary: {
      main: alpha("#fff391", 0.2),
      light: lightGreen[500],
      dark: green[500],
      contrastText: yellow[500],
    },
  },
  butter: {
    primary: {
      main: brown[100],
      light: alpha(amber[100], 0.1),
      dark: alpha(brown[500], 0.5),
      contrastText: alpha(brown[500], 0.7),
    },
    secondary: {
      main: alpha(amber[50], 0.5),
      light: brown[400],
      dark: brown[800],
      contrastText: amber[500],
    },
  },
  lavender: {
    primary: {
      // button color
      main: "#E0C2FF",
      // sidebar & wrapper color
      light: alpha("#7F00FF", 0.05),
      // login text & button hover color
      dark: alpha("#7F00FF", 0.4),
      // text & table & label & icon color
      contrastText: alpha("#47008F", 0.7),
    },
    secondary: {
      // card color
      main: "#F5EBFF",
      //   chart color
      light: purple[500],
      dark: deepPurple[500],
      contrastText: pink[500],
    },
  },
};
