import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { useConfig, useConfigDispatch } from "./ConfigContext.js";
import ArrayProvider from "./ArrayProvider.js";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { PaperStack } from "./Utils.js";

function TranslationFile() {
  const dispatch = useConfigDispatch();
  const config = useConfig();
  return (
    <FormControl fullWidth sx={{}} variant="standard">
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

function InfoHelp1({ children }) {
  return (
    <>
      <Stack direction="row">
        <InfoOutlinedIcon />
        <Typography
          variant="body2"
          display="block"
          gutterBottom
          sx={{ p: 0.4 }}
        >
          {children}
        </Typography>
      </Stack>
    </>
  );
}

function InfoHelp({ children }) {
  return (
    <>
      <Alert severity="info" variant="outlined">
        {children}
      </Alert>
    </>
  );
}

export default function PathsPane() {
  return (
    <div>
      <PaperStack Title="Translation File">
        <InfoHelp>
          Define the path where the translation file should be created. You can
          use Special Variables in the path.
        </InfoHelp>
        <TranslationFile />
      </PaperStack>

      <PaperStack Title="Execute Commands">
        <InfoHelp>
          Define the list of commands that must get executed after the
          translation file is created. You can use Special Variables in the
          path.
        </InfoHelp>
        <Execute />
      </PaperStack>
      <PaperStack Title="Special Variables">
        <p></p>
      </PaperStack>
    </div>
  );
}
