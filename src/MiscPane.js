import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { useConfig, useConfigDispatch } from "./ConfigContext.js";
import ArrayProvider from "./ArrayProvider.js";

function BackupFile() {
  const dispatch = useConfigDispatch();
  const config = useConfig();
  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
      <TextField
        fullWidth
        id="backup_file"
        label="Backup File Path"
        value={config.backup_file}
        onChange={(e) => {
          dispatch({
            type: "changed_backup_file",
            value: e.target.value,
          });
        }}
      />
    </FormControl>
  );
}

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
      ItemName="Blacklist"
      Data={config.execute}
      ActionPostfix="execute"
    />
  );
}

function WrapTextPre() {
  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
      <TextField
        fullWidth
        id="outlined-multiline-flexible"
        label="Wrap Text Pre"
        multiline
        maxRows={4}
        rows={4}
        defaultValue="@startuml"
      />
    </FormControl>
  );
}

function WrapTextPost() {
  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
      <TextField
        fullWidth
        id="outlined-multiline-flexible"
        label="Wrap Text Post"
        multiline
        maxRows={4}
        rows={4}
        defaultValue="@enduml"
      />
    </FormControl>
  );
}

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

export default function MiscPane() {
  return (
    <div>
      <BackupFile />
      <TranslationFile />
      <Execute />
      <WrapTextPre />
      <WrapTextPost />
      <AutoNewLine />
    </div>
  );
}
