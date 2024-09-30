import MobileSideMenu from "../components/MobileSideMenu";
import SideMenu from "../components/SideMenu";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <SideMenu />
      <MobileSideMenu />
      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
            mx: { xs: 0, md: 3 },
            mt: { xs: 8, md: 0 },
          }}
        >
          <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
            <Outlet />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
