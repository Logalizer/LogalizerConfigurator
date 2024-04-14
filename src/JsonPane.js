import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import React from "react";
import { useConfig, useConfigDispatch } from "./ConfigContext.js";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function JsonPane() {
  const dispatch = useConfigDispatch();
  const config = useConfig();
  const textInput = React.createRef();
  return (
    <div>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
        <Button
          variant="contained"
          onClick={(e) => {
            dispatch({
              type: "edited_json_config",
              json: textInput.current.value,
            });
          }}
        >
          Apply
        </Button>
        <TextField
          inputRef={textInput}
          fullWidth
          id="outlined-multiline-flexible"
          label=""
          multiline
          rows={20}
          InputProps={{
            readOnly: false,
          }}
          variant="filled"
          color="success"
          focused
          defaultValue={JSON.stringify(config, null, 2)}
        />
      </FormControl>
    </div>
  );
}
