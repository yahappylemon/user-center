import TextField from "@mui/material/TextField";

export default function Inputs({ id, label, type, style, value, ...props }) {
  return (
    <TextField
      id={id}
      name={id}
      label={label}
      placeholder={label}
      type={type}
      variant="standard"
      sx={(theme) => ({
        width: "100%",
        ...style,
      })}
      value={value[id]}
      {...props}
    />
  );
}
