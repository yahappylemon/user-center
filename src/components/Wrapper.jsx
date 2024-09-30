import { Box } from "@mui/material";

export default function Wrapper({
  children,
  component,
  backgroundColor,
  justifyContent,
  ...props
}) {
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: backgroundColor
          ? theme.palette.primary[backgroundColor]
          : "transparent",
        justifyContent: justifyContent && "center",
      })}
      component={component}
      {...props}
    >
      {children}
    </Box>
  );
}
