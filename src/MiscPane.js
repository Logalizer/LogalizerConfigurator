import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { useConfig, useConfigDispatch } from "./ConfigContext.js";

function BackupFile() {
  const dispatch = useConfigDispatch();
  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
      <TextField
        fullWidth
        id="backup_file"
        label="Backup File Path"
        defaultValue="${fileDirname}/generated_${fileBasenameNoExtension}/${fileBasename}.original"
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
  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
      <TextField
        fullWidth
        id="backup_file"
        label="Translation File Path"
        defaultValue="${fileDirname}/generated_${fileBasenameNoExtension}/${fileBasename}.txt"
      />
    </FormControl>
  );
}

function Execute() {
  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
      <TextField
        fullWidth
        id="outlined-multiline-flexible"
        label="Execute"
        multiline
        maxRows={4}
        rows={4}
        defaultValue='java -DPLANTUML_LIMIT_SIZE=32768 -jar ${exeDirname}/plantuml/plantuml.jar -tpng \" ${fileDirname} /generated_${fileBasenameNoExtension}/${fileBasename}.txt\"'
      />
    </FormControl>
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
  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
      <FormControlLabel
        control={<Switch defaultChecked />}
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
