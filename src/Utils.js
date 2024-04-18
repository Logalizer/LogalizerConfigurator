import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export function PaperStack({ Title, children }) {
  return (
    <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
      <Stack direction="column" spacing={2}>
        <Typography variant="h5" component="h5">
          {Title}
        </Typography>
        {children}
      </Stack>
    </Paper>
  );
}
