import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useConfig, useConfigDispatch } from "./ConfigContext.js";
import ArrayProvider from "./ArrayProvider.js";

function AutoNewLine() {
  const dispatch = useConfigDispatch();
  const config = useConfig();
  return (
    <FormControl fullWidth sx={{ margin: 2 }} variant="standard">
      <FormControlLabel
        control={
          <Switch
            inputProps={{ "aria-label": "controlled" }}
            checked={config.auto_new_line}
            onChange={(e, flag) => {
              dispatch({
                type: "changed_auto_new_line",
                value: flag,
              });
            }}
          />
        }
        label="Add New Lines after Translation"
      />
    </FormControl>
  );
}

export default function MoreTranslationsPane() {
  const config = useConfig();
  return (
    <div>
      <Paper elevation={3} sx={{ margin: 2, p: 2 }}>
        <Stack direction="column" spacing={2}>
          <Typography variant="h5" component="h5">
            Wrap Text Pre
          </Typography>
          <ArrayProvider
            ItemName="Wrap Text Pre"
            Data={config.wrap_text_pre}
            ActionPostfix="wrap_text_pre"
          />
        </Stack>
      </Paper>
      <Paper elevation={3} sx={{ margin: 2, p: 2 }}>
        <Stack direction="column" spacing={2}>
          <Typography variant="h5" component="h5">
            Wrap Text Post
          </Typography>
          <ArrayProvider
            ItemName="Wrap Text Post"
            Data={config.wrap_text_post}
            ActionPostfix="wrap_text_post"
          />
        </Stack>
      </Paper>
      <AutoNewLine />
    </div>
  );
}
