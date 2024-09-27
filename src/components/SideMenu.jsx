import { useEffect } from "react";
import { fetchUsername, clearUserInfo } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import SideMenuDrawer from "./styledDrawer";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";

const mainListItems = [
  { text: "Home", route: "/", icon: "house" },
  {
    text: "Customer",
    route: "/customer",
    icon: "users",
  },
  {
    text: "New Customer",
    route: "/newCustomer",
    icon: "user-plus",
  },
  {
    text: "User Center",
    route: "/userCenter",
    icon: "user-pen",
  },
];

export default function SideMenu() {
  const theme = useTheme();
  const location = useLocation();
  let currentPath = location.pathname;
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
      <Stack sx={{ flexGrow: 1, p: 2, justifyContent: "space-between" }}>
        <List dense>
          {mainListItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to={item.route}
                selected={currentPath === item.route}
              >
                <ListItemIcon sx={{ minWidth: "35px" }}>
                  <i
                    className={`fa-solid fa-${item.icon}`}
                    style={{ color: `${theme.palette.primary.contrastText}` }}
                  ></i>
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
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
          <Avatar sizes="small" sx={{ width: 36, height: 36 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: "16px" }}
            color="primary.contrastText"
          >
            {username}
          </Typography>
        </Stack>
        <Button
          component={Link}
          to="/auth?mode=login"
          variant="contained"
          onClick={() => dispatch(clearUserInfo())}
        >
          Logout
        </Button>
      </Stack>
    </SideMenuDrawer>
  );
}
