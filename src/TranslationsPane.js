import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import ArrayProvider from "./ArrayProvider";
import { useConfig } from "./ConfigContext.js";

export default function TranslationsPane() {
  const config = useConfig();
  const adder = (text) => {
    return {
      type: "added_blacklist",
      value: text,
    };
  };
  const editor = (Index, text) => {
    return {
      type: "edited_blacklist",
      value: text,
      index: Index,
    };
  };
  const deletor = (Index) => {
    return {
      type: "deleted_blacklist",
      index: Index,
    };
  };

  return (
    <ArrayProvider
      ItemName="Blacklist"
      Data={config.blacklist}
      AddAction={adder}
      EditAction={editor}
      DeleteAction={deletor}
    />
  );
}
