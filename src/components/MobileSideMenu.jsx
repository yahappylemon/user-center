import { useState } from "react";
import { AppBar, Box, IconButton, Toolbar, Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@mui/material/styles";
import { Navbar, Logout, User } from "./Navbar";
import MobileSideMenuDrawer from "./styledDrawer";

export default function MobileSideMenu() {
  const theme = useTheme();
  const [navBarOpen, setNavBarOpen] = useState(false);
  function handleNavBarOpen() {
    setNavBarOpen((navBarOpen) => !navBarOpen);
  }

  return (
    <Box sx={{ display: { xs: "flex", md: "none" } }}>
      <AppBar component="nav" sx={{ py: { xs: 1, sm: 0 } }}>
        <Toolbar
          direction="row"
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            width: "100%",
            justifyContent: { xs: "space-between", sm: "center" },
          }}
        >
          <IconButton
            onClick={handleNavBarOpen}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <FontAwesomeIcon
              icon={faBars}
              style={{
                color: `${theme.palette.primary.contrastText}`,
              }}
            />
          </IconButton>
          {/* sm大小導覽列 */}
          <Navbar
            direction="row"
            spacing={2}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              display: { xs: "none", sm: "flex" },
            }}
          >
            <Logout
              fullWidth
              variant="contained"
              sx={{
                display: { xs: "none", sm: "flex" },
                bgcolor: theme.palette.primary.dark,
                color: theme.palette.secondary.dark,
                "&:hover": {
                  bgcolor: theme.palette.secondary.main,
                },
              }}
            />
          </Navbar>
          {/* xs大小導覽列 */}
          <Stack direction="row" gap={2}>
            <User
              display={{
                display: { xs: "flex", sm: "none" },
              }}
            />
            <Logout
              sx={{
                display: { xs: "flex", sm: "none" },
                bgcolor: theme.palette.primary.dark,
                color: theme.palette.secondary.dark,
                "&:hover": {
                  bgcolor: theme.palette.secondary.main,
                },
              }}
            />
          </Stack>
        </Toolbar>
      </AppBar>
      <nav>
        <MobileSideMenuDrawer
          variant="temporary"
          open={navBarOpen}
          onClose={handleNavBarOpen}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
          }}
        >
          <Box onClick={handleNavBarOpen} sx={{ textAlign: "center" }}>
            <Navbar sx={{ flexGrow: 1, p: 2 }}></Navbar>
          </Box>
        </MobileSideMenuDrawer>
      </nav>
    </Box>
  );
}
