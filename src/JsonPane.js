import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useConfig, useConfigDispatch } from "./ConfigContext.js";
import FormControlLabel from "@mui/material/FormControlLabel";
import DownloadIcon from "@mui/icons-material/Download";
import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import Snackbar from "@mui/material/Snackbar";
import UploadIcon from "@mui/icons-material/Upload";

import Stack from "@mui/material/Stack";

function saveTextAsFile(textToWrite, fileNameToSaveAs) {
  var textFileAsBlob = new Blob([textToWrite], { type: "text/plain" });
  var downloadLink = document.createElement("a");
  downloadLink.download = fileNameToSaveAs;
  downloadLink.innerHTML = "Download File";
  if (window.webkitURL != null) {
    // Chrome allows the link to be clicked
    // without actually adding it to the DOM.
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
  } else {
    // Firefox requires the link to be added to the DOM
    // before it can be clicked.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
  }

  downloadLink.click();
}

export default function JsonPane() {
  const dispatch = useConfigDispatch();
  const config = useConfig();
  const [value, setValue] = React.useState(JSON.stringify(config, null, 2));
  const onChange = React.useCallback((val, viewUpdate) => {
    setValue(val);
  }, []);

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          onClick={(e) => {
            dispatch({
              type: "edited_json_config",
              json: value,
            });
          }}
          startIcon={<UploadIcon />}
        >
          Apply
        </Button>
        <Button
          variant="outlined"
          onClick={(e) => {
            navigator.clipboard.writeText(value);
          }}
          startIcon={<ContentCopyIcon />}
        >
          Copy
        </Button>
        <Button
          variant="outlined"
          onClick={(e) => {
            navigator.clipboard.writeText(value);
            saveTextAsFile(value, "config.json");
          }}
          startIcon={<DownloadIcon />}
        >
          Download
        </Button>
      </Stack>
      <CodeMirror value={JSON.stringify(config, null, 2)} onChange={onChange} />
    </>
  );
}
