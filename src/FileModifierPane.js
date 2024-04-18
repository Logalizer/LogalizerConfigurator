import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Alert from "@mui/material/Alert";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import ArrayProvider from "./ArrayProvider";
import PairArrayProvider from "./PairArrayProvider.js";
import { useConfig, useConfigDispatch } from "./ConfigContext.js";
import { PaperStack } from "./Utils.js";

function BackupFile() {
  const dispatch = useConfigDispatch();
  const config = useConfig();
  return (
    <FormControl fullWidth sx={{ m: 2 }} variant="standard">
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

function ReplaceWords({ Data }) {
  const dispatch = useConfigDispatch();
  const config = useConfig();
  const dataParser = (input) => {
    let data = [];
    Object.entries(input).forEach(([key, value]) => {
      data.push([key, value]);
    });
    return data;
  };

  return (
    <PairArrayProvider
      ItemName="Search Replace"
      Data={dataParser(Data)}
      TitlePair={["Search", "Replace"]}
      ActionPostfix="replace_words"
    />
  );
}

export default function FileModifierPane() {
  const config = useConfig();
  return (
    <>
      <Alert severity="warning" variant="outlined" sx={{ mt: 2 }}>
        The input file contents will be modified with the below configuration.
      </Alert>
      <PaperStack Title="Delete Lines">
        <Alert severity="info" variant="outlined">
          If the file contains a matching pattern, those lines will be deleted.
          Typically used to remove unnecessary logs.
        </Alert>
        <ArrayProvider
          ItemName="Delete Lines"
          Data={config.delete_lines}
          ActionPostfix="delete_lines"
        />
      </PaperStack>

      <PaperStack Title="Replace Words">
        <Alert severity="info" variant="outlined">
          Just like find and replace. The input file contents will be modified.
          Typically used to replace enum numbers with names.
        </Alert>
        <ReplaceWords Data={config.replace_words} />
      </PaperStack>

      <PaperStack Title="Backup Input File">
        <Alert severity="info" variant="outlined">
          Use this to take a backup before the file is modified by Delete Lines
          and Replace Words configuration.
        </Alert>
        <BackupFile />
      </PaperStack>
    </>
  );
}
