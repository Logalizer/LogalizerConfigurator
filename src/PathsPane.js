import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { useConfig, useConfigDispatch } from "./ConfigContext.js";
import ArrayProvider from "./ArrayProvider.js";

function TranslationFile() {
  const dispatch = useConfigDispatch();
  const config = useConfig();
  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
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
      <Execute />
    </div>
  );
}
