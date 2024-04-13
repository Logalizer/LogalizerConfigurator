import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import { useConfig, useConfigDispatch } from "./ConfigContext.js";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function JsonPane() {
  const dispatch = useConfigDispatch();
  const config = useConfig();
  return (
    <div>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
        <TextField
          fullWidth
          id="outlined-multiline-flexible"
          label="json"
          multiline
          rows={20}
          defaultValue="{}"
          value={JSON.stringify(config, null, 2)}
        />
      </FormControl>
    </div>
  );
}
