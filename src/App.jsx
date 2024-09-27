import { Provider } from "react-redux";
import store from "./store";
import { RouterProvider } from "react-router-dom";
import router from "./router/index";
import { ThemeProvider, createTheme, alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "../src/style.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E0C2FF",
      // wrapper color
      light: alpha("#7F00FF", 0.05),
      dark: alpha("#7F00FF", 0.4),
      contrastText: alpha("#47008F", 0.7),
    },
    secondary: {
      // sidebar & card color
      main: "#F5EBFF",
    },
  },
  typography: {
    fontFamily: "Sen, Roboto, sans-serif",
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
