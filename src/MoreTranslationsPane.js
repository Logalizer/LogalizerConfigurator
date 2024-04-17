import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";

import { useConfig, useConfigDispatch } from "./ConfigContext.js";
import ArrayProvider from "./ArrayProvider.js";

function AutoNewLine() {
  const dispatch = useConfigDispatch();
  const config = useConfig();
  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
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
      <ArrayProvider
        ItemName="Wrap Text Pre"
        Data={config.wrap_text_pre}
        ActionPostfix="wrap_text_pre"
      />
      <ArrayProvider
        ItemName="Wrap Text Post"
        Data={config.wrap_text_post}
        ActionPostfix="wrap_text_post"
      />
      <AutoNewLine />
    </div>
  );
}
