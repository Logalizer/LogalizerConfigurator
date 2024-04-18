import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useConfig, useConfigDispatch } from "./ConfigContext.js";
import FormControlLabel from "@mui/material/FormControlLabel";

import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";

import Stack from "@mui/material/Stack";

function CodeMirrorJsonPane() {
  const dispatch = useConfigDispatch();
  const config = useConfig();
  const [value, setValue] = React.useState(JSON.stringify(config, null, 2));
  const onChange = React.useCallback((val, viewUpdate) => {
    setValue(val);
  }, []);

  return (
    <Stack>
      <Button
        variant="contained"
        onClick={(e) => {
          dispatch({
            type: "edited_json_config",
            json: value,
          });
        }}
      >
        Apply
      </Button>

      <CodeMirror value={JSON.stringify(config, null, 2)} onChange={onChange} />
    </Stack>
  );
}

function MUIJsonPane() {
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
          key={config.hash}
          defaultValue={JSON.stringify(config, null, 2)}
        />
      </FormControl>
    </div>
  );
}

export default function JsonPane() {
  return CodeMirrorJsonPane();
}
