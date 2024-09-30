import { RouterProvider } from "react-router-dom";
import router from "./router/index";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "../src/style.css";
import { useSelector } from "react-redux";
import { palette } from "../src/utils/palette";
import { useMemo } from "react";

function App() {
  const currentTheme = useSelector((state) => state.theme.theme);
  const theme = useMemo(
    () =>
      createTheme({
        palette: palette[currentTheme],
        typography: {
          fontFamily: "Sen, Roboto, sans-serif",
        },
      }),
    [currentTheme]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
