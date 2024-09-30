import SideMenuDrawer from "./styledDrawer";
import Stack from "@mui/material/Stack";
import { Navbar, Logout, User } from "./Navbar";

export default function SideMenu() {
  return (
    <SideMenuDrawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
      }}
    >
      <Navbar sx={{ flexGrow: 1, p: 2 }} />
      <Stack
        sx={{
          p: 2,
          gap: 1,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <User />
        <Logout />
      </Stack>
    </SideMenuDrawer>
  );
}
