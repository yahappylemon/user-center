import {
  FormControl,
  Select,
  Checkbox,
  OutlinedInput,
  MenuItem,
  ListItemText,
} from "@mui/material";
import Inputs from "../components/Inputs";
import Grid from "@mui/material/Grid2";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Selects({
  id,
  label,
  value,
  options,
  onChangeFn,
  otherId,
  otherLabel,
  ...props
}) {
  return (
    <>
      <Grid size={{ xs: 12, sm: 6, md: 6 }}>
        <FormControl sx={{ width: "100%" }}>
          <Select
            id={id}
            name={id}
            multiple
            displayEmpty={value[id]?.length === 0 ? true : false}
            value={value[id]}
            onChange={onChangeFn}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>{label}</em>;
              } else {
                return selected.join(", ");
              }
            }}
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>{label}</em>
            </MenuItem>
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox checked={value[id]?.includes(option)} />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 6 }}>
        {(value[id]?.includes("其他") || value[id]?.includes("Other")) && (
          <Inputs
            id={otherId}
            label={otherLabel}
            type="text"
            value={value}
            onChange={onChangeFn}
          />
        )}
      </Grid>
    </>
  );
}
