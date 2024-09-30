import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";

const styledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    margin: "auto",
    minHeight: "590px",
  },
  [theme.breakpoints.down("md")]: {
    minHeight: "100vh",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  backgroundColor: `${theme.palette.secondary.main}`,
}));

export default styledCard;
