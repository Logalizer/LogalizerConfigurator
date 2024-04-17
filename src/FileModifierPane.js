import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

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
  const dataParser2 = (input) => {
    let data = [];
    Object.entries(input).forEach(([key, value]) => {
      data.push({ first: key, second: value });
    });
    return data;
  };
  return (
    <PairArrayProvider
      ItemName="Search Replace"
      Data={dataParser(Data)}
      ActionPostfix="replace_words"
    />
  );
}

export default function FileModifierPane() {
  const config = useConfig();
  return (
    <>
      <Paper elevation={3} sx={{ margin: 2, p: 2 }}>
        <Stack direction="column" spacing={2}>
          <Typography variant="h5" component="h5">
            Delete Lines
          </Typography>
          <ArrayProvider
            ItemName="Delete Lines"
            Data={config.delete_lines}
            ActionPostfix="delete_lines"
          />
        </Stack>
      </Paper>

      <Paper elevation={3} sx={{ margin: 2, p: 2 }}>
        <Stack direction="column" spacing={2}>
          <Typography variant="h5" component="h5">
            Replace Words
          </Typography>
          <ReplaceWords Data={config.replace_words} />
        </Stack>
      </Paper>
      <BackupFile />
    </>
  );
}
