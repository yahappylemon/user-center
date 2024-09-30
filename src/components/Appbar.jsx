import { styled } from "@mui/material/styles";
import { AppBar, Stack } from "@mui/material";
import MuiToolbar from "@mui/material/Toolbar";
import { tabsClasses } from "@mui/material/Tabs";
import { Navbar, Logout } from "./Navbar";

const Toolbar = styled(MuiToolbar)({
  width: "100%",
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "center",
  gap: "12px",
  flexShrink: 0,
  [`& ${tabsClasses.flexContainer}`]: {
    gap: "8px",
    p: "8px",
    pb: 0,
  },
});

export default function AppNavbar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        display: { xs: "auto", md: "none" },
        boxShadow: 0,
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        top: "var(--template-frame-height, 0px)",
      }}
    >
      <Toolbar
        variant="regular"
        sx={{
          py: 0,
        }}
      >
        <Stack
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            width: "100%",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Navbar />
            <Logout fullWidth />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
