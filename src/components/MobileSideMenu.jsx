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
      <AppBar
        component="nav"
        sx={{
          py: 1.5,
          "@media (max-width:483px)": {
            py: 1,
          },
          "@media (min-width:600px)": {
            py: 0,
          },
        }}
      >
        <Toolbar
          direction="row"
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            width: "100%",
            justifyContent: "space-between",
            "@media (min-width:701px)": {
              justifyContent: "center",
            },
          }}
        >
          <IconButton
            onClick={handleNavBarOpen}
            sx={{ mr: 2, "@media (min-width:701px)": { display: "none" } }}
          >
            <FontAwesomeIcon
              icon={faBars}
              style={{
                color: `${theme.palette.primary.contrastText}`,
              }}
            />
          </IconButton>
          {/* > 700px 導覽列 */}
          <Navbar
            direction="row"
            spacing={2}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              display: "none",
              "@media (min-width:701px)": {
                display: "flex",
              },
            }}
          >
            <Logout
              fullWidth
              variant="contained"
              sx={{
                display: "none",
                "@media (min-width:701px)": {
                  display: "flex",
                },
                bgcolor: theme.palette.primary.dark,
                color: theme.palette.secondary.dark,
                "&:hover": {
                  bgcolor: theme.palette.secondary.main,
                },
              }}
            />
          </Navbar>
          {/* < 700px導覽列 */}
          <Stack direction="row" gap={2}>
            <User
              display={{
                display: "none",
                "@media (min-width: 250px) and (max-width:700px)": {
                  display: "flex",
                },
              }}
            />
            <Logout
              sx={{
                display: "none",
                "@media (max-width:700px)": {
                  display: "flex",
                },
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
            display: "none",
            "@media (max-width:700px)": {
              display: "flex",
            },
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
