import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import ArrayProvider from "./ArrayProvider";
import Switch from "@mui/material/Switch";
import { useConfig, useConfigDispatch } from "./ConfigContext.js";
import PairArrayProvider from "./PairArrayProvider.js";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { Edit } from "@mui/icons-material";

function Group({ Index, Text }) {
  const dispatch = useConfigDispatch();
  return (
    <FormControl fullWidth variant="standard">
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
    <FormControl fullWidth variant="standard">
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
  const AddAction = (text) => {
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

function Variables({ TrIndex, Data }) {
  const transformedData = Data.map((item, i) => {
    return [item.startswith, item.endswith];
  });

  const AddAction = (text1, text2) => {
    return {
      type: "added_variables",
      value1: text1,
      value2: text2,
      tr_index: TrIndex,
    };
  };
  const EditAction = (Index, text1, text2) => {
    return {
      type: "edited_variables",
      value1: text1,
      value2: text2,
      index: Index,
      tr_index: TrIndex,
    };
  };
  const DeleteAction = (Index) => {
    return {
      type: "deleted_variables",
      index: Index,
      tr_index: TrIndex,
    };
  };
  const variablesContent = (
    <PairArrayProvider
      ItemName={"Variables"}
      Data={transformedData}
      TitlePair={["Starts With", "Ends With"]}
      ActionPostfix="translation_variables"
      AddAction={AddAction}
      EditAction={EditAction}
      DeleteAction={DeleteAction}
    />
  );
  return variablesContent;
}

function Enabled({ Index, Value }) {
  const dispatch = useConfigDispatch();
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
                tr_index: Index,
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
  const dispatch = useConfigDispatch();
  const options = [
    { label: "allowed" },
    { label: "remove" },
    { label: "remove_continuous" },
    { label: "count" },
    { label: "count_continuous" },
  ];
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      value={Value}
      inputValue={Value}
      onInputChange={(e, newInputValue) => {
        console.log(newInputValue);
        dispatch({
          type: "changed_tr_duplicates",
          value: newInputValue,
          tr_index: Index,
        });
      }}
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
        <Paper elevation={3} sx={{ margin: 2, p: 2 }}>
          <Stack direction="column" spacing={2}>
            <Typography variant="h5" component="h5">
              {tr.print}
            </Typography>
            <Group Index={i} Text={tr.group} />
            <Print Index={i} Text={tr.print} />
            <Paper elevation={2} sx={{ margin: 2, p: 2 }}>
              <Typography variant="h5" component="h5" sx={{ mb: 1 }}>
                Patterns
              </Typography>
              <Patterns TrIndex={i} Data={tr.patterns} />
            </Paper>
            <Paper elevation={2} sx={{ margin: 2, p: 2 }}>
              <Typography variant="h5" component="h5" sx={{ mb: 1 }}>
                Variables
              </Typography>
              <Variables TrIndex={i} Data={tr.variables} />
            </Paper>
            <Enabled Index={i} Value={tr.enabled ?? true} />
            <Duplicates Index={i} Value={tr.duplicates} />
          </Stack>
        </Paper>
      </>
    );
  });

  return <>{translations}</>;
}
