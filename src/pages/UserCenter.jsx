import {
  Box,
  Typography,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Wrapper from "../components/Wrapper";
import NewCard from "../components/styledCard";
import Inputs from "../components/Inputs";

export default function UserCenter() {
  return (
    <Wrapper>
      <NewCard sx={{ width: "100%" }}>
        <Typography variant="h5" component="h1">
          User Center
        </Typography>
      </NewCard>
    </Wrapper>
  );
}
