import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";

const drawerWidth = 240;

const styledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    [theme.breakpoints.up("md")]: {
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

export default styledDrawer;
