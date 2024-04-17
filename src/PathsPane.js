import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { useConfig, useConfigDispatch } from "./ConfigContext.js";
import ArrayProvider from "./ArrayProvider.js";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
function TranslationFile() {
  const dispatch = useConfigDispatch();
  const config = useConfig();
  return (
    <FormControl fullWidth sx={{ m: 2 }} variant="standard">
      <TextField
        fullWidth
        id="translation_file"
        label="Translation File Path"
        value={config.translation_file}
        onChange={(e) => {
          dispatch({
            type: "changed_translation_file",
            value: e.target.value,
          });
        }}
      />
    </FormControl>
  );
}

function Execute() {
  const config = useConfig();

  return (
    <ArrayProvider
      ItemName="commands to execute"
      Data={config.execute}
      ActionPostfix="execute"
    />
  );
}

export default function PathsPane() {
  return (
    <div>
      <TranslationFile />
      <Paper elevation={3} sx={{ margin: 2, p: 2 }}>
        <Stack direction="column" spacing={2}>
          <Typography variant="h5" component="h5">
            Execute
          </Typography>
          <Execute />
        </Stack>
      </Paper>
    </div>
  );
}
