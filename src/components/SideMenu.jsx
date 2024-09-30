import { useEffect } from "react";
import { fetchUsername } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
import SideMenuDrawer from "./styledDrawer";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Navbar, Logout } from "./Navbar";

export default function SideMenu() {
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsername());
  }, [dispatch]);

  return (
    <SideMenuDrawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
      }}
    >
      <Stack sx={{ flexGrow: 1, p: 2 }}>
        <Navbar />
      </Stack>
      <Stack
        sx={{
          p: 2,
          gap: 1,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack
          direction="row"
          sx={{
            gap: 1,
            alignItems: "center",
          }}
        >
          <Avatar
            sizes="small"
            sx={(theme) => ({
              width: 36,
              height: 36,
              bgcolor: theme.palette.primary.main,
            })}
          />
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: "16px" }}
            color="primary.contrastText"
          >
            {username}
          </Typography>
        </Stack>
        <Logout />
      </Stack>
    </SideMenuDrawer>
  );
}
