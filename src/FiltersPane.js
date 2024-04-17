import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import ArrayProvider from "./ArrayProvider.js";
import { useConfig } from "./ConfigContext.js";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function FiltersPane() {
  const config = useConfig();
  return (
    <>
      <Paper elevation={3} sx={{ margin: 2, p: 2 }}>
        <Stack direction="column" spacing={2}>
          <Typography variant="h5" component="h5">
            Blacklist
          </Typography>
          <ArrayProvider
            ItemName="Blacklist"
            Data={config.blacklist}
            ActionPostfix="blacklist"
          />
        </Stack>
      </Paper>
      <Paper elevation={3} sx={{ margin: 2, p: 2 }}>
        <Stack direction="column" spacing={2}>
          <Typography variant="h5" component="h5">
            Disable Group
          </Typography>
          <ArrayProvider
            ItemName="Disable Group"
            Data={config.disable_group}
            ActionPostfix="disable_group"
          />
        </Stack>
      </Paper>
    </>
  );
}
