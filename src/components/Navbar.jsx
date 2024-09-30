import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faUserPlus,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { clearUserInfo } from "../store/auth";
import { Link, useLocation } from "react-router-dom";

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
export function Navbar() {
  const theme = useTheme();
  const location = useLocation();
  let currentPath = location.pathname;
  return (
    <>
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
              mt: 1,
              mb: { xs: 1, md: 0 },
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
    </>
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
