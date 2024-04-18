import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import OutlinedInput from "@mui/material/OutlinedInput";
import Switch from "@mui/material/Switch";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import TabBar from "./TabBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { ConfigProvider } from "./ConfigContext.js";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="">
        Logalizer Configurator
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function App() {
  return (
    <Container maxWidth="xm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h3" sx={{ mb: 2 }}>
          Logalizer Configurator
        </Typography>
        <ConfigProvider>
          <TabBar />
        </ConfigProvider>
      </Box>
    </Container>
  );
}
