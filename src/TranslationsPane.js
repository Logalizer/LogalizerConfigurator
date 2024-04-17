import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import ArrayProvider from "./ArrayProvider";
import Switch from "@mui/material/Switch";
import { useConfig, useConfigDispatch } from "./ConfigContext.js";
import PairArrayProvider from "./PairArrayProvider.js";

import Autocomplete from "@mui/material/Autocomplete";
import { Edit } from "@mui/icons-material";

function Group({ Index, Text }) {
  const dispatch = useConfigDispatch();
  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
      <TextField
        fullWidth
        id="group"
        label="Group"
        value={Text}
        onChange={(e) => {
          dispatch({
            type: "changed_group",
            value: e.target.value,
            index: Index,
          });
        }}
      />
    </FormControl>
  );
}
function Print({ Index, Text }) {
  const dispatch = useConfigDispatch();
  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
      <TextField
        fullWidth
        id="print"
        label="Print"
        value={Text}
        onChange={(e) => {
          dispatch({
            type: "changed_print",
            value: e.target.value,
            index: Index,
          });
        }}
      />
    </FormControl>
  );
}
function Patterns({ TrIndex, Data }) {
  let AddAction;
  AddAction = (text) => {
    return {
      type: "added_patterns",
      value: text,
      tr_index: TrIndex,
    };
  };
  const EditAction = (Index, text) => {
    return {
      type: "edited_patterns",
      value: text,
      index: Index,
      tr_index: TrIndex,
    };
  };
  const DeleteAction = (Index) => {
    return {
      type: "deleted_patterns",
      index: Index,
      tr_index: TrIndex,
    };
  };
  return (
    <ArrayProvider
      ItemName="Patterns"
      Data={Data}
      ActionPostfix="patterns"
      AddAction={AddAction}
      EditAction={EditAction}
      DeleteAction={DeleteAction}
    />
  );
}

function Variables({ Index, Data }) {
  const config = useConfig();
  const transformedData = Data.map((item, i) => {
    return [item.startswith, item.endswith];
  });

  const variablesContent = (
    <PairArrayProvider
      ItemName={"Variables"}
      // Data={config.translations[Index].variables}
      Data={transformedData}
      ActionPostfix="translation_variables"
    />
  );
  return variablesContent;
}

function Enabled({ Index, Value }) {
  const dispatch = useConfigDispatch();
  const config = useConfig();
  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
      <FormControlLabel
        control={
          <Switch
            inputProps={{ "aria-label": "controlled" }}
            checked={Value}
            onChange={(e, flag) => {
              dispatch({
                type: "changed_tr_enabled",
                value: flag,
              });
            }}
          />
        }
        label="Enabled"
      />
    </FormControl>
  );
}

function Duplicates({ Index, Value }) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={[
        { label: "remove" },
        { label: "remove_continuous" },
        { label: "count" },
        { label: "count_continuous" },
      ]}
      value={Value}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Duplicates" />}
    />
  );
}

export default function TranslationsPane() {
  const config = useConfig();

  const translations = config.translations.map((tr, i) => {
    return (
      <>
        <Group Index={i} Text={tr.group} />
        <Print Index={i} Text={tr.print} />
        <Patterns TrIndex={i} Data={tr.patterns} />
        <Variables Index={i} Data={tr.variables} />
        <Enabled Index={i} Value={tr.enabled} />
        <Duplicates Index={i} Value={tr.duplicates} />
      </>
    );
  });

  return <>{translations}</>;
}
