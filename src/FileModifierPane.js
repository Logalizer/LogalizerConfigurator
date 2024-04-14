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
import { useConfig } from "./ConfigContext.js";
function Execute() {
  return (
    <Box sx={{}}>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
        <OutlinedInput fullWidth placeholder="Blacklist" />
      </FormControl>

      <Box sx={{ flexWrap: "wrap", p: 2, border: "1px solid grey" }}>
        <Grid container spacing={12}>
          <Grid xs={1}>Blacklist</Grid>
          <Grid xs={1}>
            <IconButton aria-label="delete">
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>

        <List>
          <ListItem disablePadding>
            <OutlinedInput sx={{ m: 1 }} fullWidth placeholder="Blacklist" />
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItem>
          <ListItem disablePadding>
            <OutlinedInput sx={{ m: 1 }} fullWidth placeholder="Blacklist" />
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default function FileModifierPane() {
  const config = useConfig();
  return (
    <ArrayProvider
      ItemName="Blacklist"
      Data={config.blacklist}
      ActionPostfix="blacklist"
    />
  );
}
