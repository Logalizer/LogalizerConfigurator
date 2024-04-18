import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useConfig, useConfigDispatch } from "./ConfigContext.js";
import ArrayProvider from "./ArrayProvider.js";
import { PaperStack } from "./Utils.js";
import Alert from "@mui/material/Alert";

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
      <PaperStack Title="Wrap Text Pre">
        <Alert severity="info" variant="outlined">
          A list of lines that will be added to the top of the translation file.
        </Alert>
        <ArrayProvider
          ItemName="Wrap Text Pre"
          Data={config.wrap_text_pre}
          ActionPostfix="wrap_text_pre"
        />
      </PaperStack>

      <PaperStack Title="Wrap Text Post">
        <Alert severity="info" variant="outlined">
          This defines a list of lines that will be added at the end of the
          translation file.
        </Alert>
        <ArrayProvider
          ItemName="Wrap Text Post"
          Data={config.wrap_text_post}
          ActionPostfix="wrap_text_post"
        />
      </PaperStack>
      <PaperStack Title="Wrap Text Post">
        <Alert severity="info" variant="outlined">
          If set to false new line is not inserted automatically after every
          translation is printed. You can add '\n' if you want in your prints.
          This might be helpful if you want multiple translation prints in a
          single line.
        </Alert>
        <AutoNewLine />
      </PaperStack>
    </div>
  );
}
