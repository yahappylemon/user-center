import { Box } from "@mui/material";

export default function Wrapper({
  children,
  component,
  backgroundColor,
  ...props
}) {
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: backgroundColor
          ? theme.palette.primary[backgroundColor]
          : "transparent",
      })}
      component={component}
      {...props}
    >
      {children}
    </Box>
  );
}
