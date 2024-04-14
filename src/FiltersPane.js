import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import ArrayProvider from "./ArrayProvider.js";
import { useConfig } from "./ConfigContext.js";

export default function FiltersPane() {
  const config = useConfig();
  return (
    <>
      <ArrayProvider
        ItemName="Blacklist"
        Data={config.blacklist}
        ActionPostfix="blacklist"
      />
      <ArrayProvider
        ItemName="Disable Group"
        Data={config.disable_group}
        ActionPostfix="disable_group"
      />
    </>
  );
}
