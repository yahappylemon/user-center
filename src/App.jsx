import { RouterProvider } from "react-router-dom";
import router from "./router/index";
import { GlobalStyles } from "@mui/material";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
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
      <GlobalStyles
        styles={{
          [`body::-webkit-scrollbar, #root ::-webkit-scrollbar`]: {
            width: "10px",
          },
          [`body::-webkit-scrollbar-track, #root ::-webkit-scrollbar-track`]: {
            background: theme.palette.secondary.main,
            borderRadius: "5px",
          },
          [`body::-webkit-scrollbar-thumb, #root ::-webkit-scrollbar-thumb`]: {
            background: theme.palette.primary.main,
            borderRadius: "5px",
          },
          [`body::-webkit-scrollbar-thumb:hover, #root ::-webkit-scrollbar-thumb:hover`]:
            {
              background: theme.palette.primary.dark,
            },
        }}
      />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
