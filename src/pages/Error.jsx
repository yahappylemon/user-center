import Typography from "@mui/material/Typography";
import Wrapper from "../components/Wrapper";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <Wrapper backgroundColor="light">
      <Typography component="h1" variant="h1" align="center">
        OH NO!
      </Typography>
      <Typography component="p" variant="h4" align="center">
        Something went wrong...
      </Typography>
      <Button
        component={Link}
        variant="contained"
        to={"/"}
        align="center"
        sx={{ mt: 4, width: "50%", alignSelf: "center" }}
      >
        Take me back to Home
      </Button>
    </Wrapper>
  );
}
