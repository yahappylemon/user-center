import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Avatar,
  Stack,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faUserPlus,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsername, clearUserInfo } from "../store/auth";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const mainListItems = [
  { text: "Home", route: "/", icon: faHouse },
  {
    text: "Customer",
    route: "/customer",
    icon: faUsers,
  },
  {
    text: "New Customer",
    route: "/newCustomer",
    icon: faUserPlus,
  },
  {
    text: "User Center",
    route: "/userCenter",
    icon: faUserPen,
  },
];
export function Navbar({ children, ...props }) {
  const theme = useTheme();
  const location = useLocation();
  let currentPath = location.pathname;
  return (
    <Stack {...props}>
      {mainListItems.map((item) => (
        <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            component={Link}
            to={item.route}
            selected={currentPath === item.route}
            sx={{
              "&.Mui-selected": {
                bgcolor: `${theme.palette.primary.main}`,
              },
              "&:hover": {
                bgcolor: `${theme.palette.primary.dark}`,
              },
              borderRadius: "10px",
              mt: { xs: 1, sm: 0, md: 1 },
            }}
          >
            <ListItemIcon sx={{ minWidth: "35px" }}>
              <FontAwesomeIcon
                icon={item.icon}
                style={{
                  color: `${theme.palette.primary.contrastText}`,
                }}
              />
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
      {children}
    </Stack>
  );
}

export function Logout({ ...props }) {
  const dispatch = useDispatch();
  return (
    <Button
      component={Link}
      to="/auth?mode=login"
      variant="contained"
      onClick={() => dispatch(clearUserInfo())}
      {...props}
    >
      Logout
    </Button>
  );
}

export function User({ display }) {
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsername());
  }, [dispatch]);
  return (
    <Stack
      direction="row"
      sx={{
        gap: 1,
        alignItems: "center",
        ...display,
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
  );
}
