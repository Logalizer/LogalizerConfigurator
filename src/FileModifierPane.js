import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

import { useState } from "react";
import ArrayProvider from "./ArrayProvider";
import { useConfig, useConfigDispatch } from "./ConfigContext.js";

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

export default function FileModifierPane() {
  const config = useConfig();
  return (
    <>
      <ArrayProvider
        ItemName="Delete Lines"
        Data={config.delete_lines}
        ActionPostfix="delete_lines"
      />
      <BackupFile />
    </>
  );
}
