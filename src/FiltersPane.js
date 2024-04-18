import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import ArrayProvider from "./ArrayProvider.js";
import { useConfig } from "./ConfigContext.js";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { PaperStack } from "./Utils.js";
import Alert from "@mui/material/Alert";
export default function FiltersPane() {
  const config = useConfig();
  return (
    <>
      <PaperStack Title="Disable Group">
        <Alert severity="info" variant="outlined">
          Used to disable a group of translations. Typically used when you want
          to filter out groups providing low level details.
        </Alert>
        <ArrayProvider
          ItemName="Disable Group"
          Data={config.disable_group}
          ActionPostfix="disable_group"
        />
      </PaperStack>
      <PaperStack Title="Blacklist">
        <Alert severity="info" variant="outlined">
          If the translation matches the below tokens they will not be printed.
          Use when you want to filter out a translation with a particular
          captured variable that is repetitive or useless but keep others values
          that are useful.
        </Alert>
        <ArrayProvider
          ItemName="Blacklist"
          Data={config.blacklist}
          ActionPostfix="blacklist"
        />
      </PaperStack>
    </>
  );
}
