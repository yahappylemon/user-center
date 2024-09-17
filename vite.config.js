import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const base = command === "serve" ? "/" : "/user-center/";

  return {
    base,
    plugins: [react()],
    resolve: {
      alias: {
        "@mui/styled-engine": "@mui/styled-engine-sc",
      },
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    },
  };
});
