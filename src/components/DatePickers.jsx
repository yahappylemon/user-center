import { FormControl, FormLabel, FormHelperText } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function DatePickers({
  name,
  label,
  value,
  onChangeFn,
  helperText,
  ...props
}) {
  return (
    <FormControl sx={{ width: "100%" }}>
      <FormLabel htmlFor={name} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          name={name}
          value={value[name]}
          onChange={onChangeFn}
          {...props}
        />
      </LocalizationProvider>
      {helperText && (
        <FormHelperText error sx={{ m: 0 }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
