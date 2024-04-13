import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import FormControlLabel from "@mui/material/FormControlLabel";

export default function JsonPane() {
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
        />
      </FormControl>
    </div>
  );
}
