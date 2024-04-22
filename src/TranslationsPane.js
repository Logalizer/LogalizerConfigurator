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
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Unstable_Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddIcon from "@mui/icons-material/Add";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import Collapse from "@mui/material/Collapse";
function Group({ Index, Text }) {
  const dispatch = useConfigDispatch();
  return (
    <FormControl fullWidth variant="standard">
      <TextField
        fullWidth
        id="group"
        label="Group"
        value={Text}
        size="small"
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
        size="small"
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
  const DragAction = (activeIndex, overIndex) => {
    return {
      type: "dragged_patterns",
      activeIndex: activeIndex,
      overIndex: overIndex,
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
      DragAction={DragAction}
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
  const DragAction = (activeIndex, overIndex) => {
    return {
      type: "dragged_variables",
      activeIndex: activeIndex,
      overIndex: overIndex,
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
      DragAction={DragAction}
    />
  );
  return variablesContent;
}

function Enabled({ Index, Value }) {
  const dispatch = useConfigDispatch();
  return (
    <FormControl fullWidth variant="standard">
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
        label="Enable"
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

function DeleteBtn({ Index }) {
  const dispatch = useConfigDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton aria-label="delete">
        <DeleteIcon
          onClick={(e) => {
            handleClickOpen();
          }}
        />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Translation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this translation?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => {
              dispatch({
                type: "deleted_translation",
                index: Index,
              });
              setOpen(false);
            }}
          >
            Yes
          </Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function Translation({ Index, Translation, Details }) {
  // 0 - undefined
  // 1 - hide
  // 2 = show
  const [viewDetails, setViewDetails] = useState({
    Details: Details,
    prevDetails: Details,
    localDetails: false,
  });
  const i = Index;
  const tr = Translation;
  const showProp = { display: { xl: "none", xs: "block" } };
  const hideProp = { display: { xs: "none", md: "block" } };
  let show;
  if (Details != viewDetails.prevDetails) {
    show = Details;
    viewDetails.prevDetails = Details;
    viewDetails.localDetails = Details;
  } else {
    show = viewDetails.localDetails;
  }
  return (
    <Paper elevation={3} sx={{ margin: 2, p: 2 }}>
      <Grid container spacing={2}>
        <Grid xs>
          <Group Index={i} Text={tr.group} />
        </Grid>
        <Grid xs={8}>
          <Print Index={i} Text={tr.print} />
          <Typography variant="h5" component="h5"></Typography>
        </Grid>
        <Grid xs="auto">
          <Stack direction="row">
            <Enabled Index={i} Value={tr.enabled ?? true} />
            <DeleteBtn Index={i} />
            <Box
              paddingTop={1}
              onClick={(e) => {
                setViewDetails((prev) => {
                  return {
                    ...prev,
                    localDetails: !prev.localDetails,
                  };
                });
              }}
            >
              {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
          </Stack>
        </Grid>

        <Grid xs={12}>
          <Collapse orientation="vertical" in={show}>
            <Grid xs={12}>
              <Paper elevation={0} sx={{}}>
                {" "}
                <Typography variant="h5" component="h5" sx={{ mb: 1 }}>
                  Patterns
                </Typography>
                <Patterns TrIndex={i} Data={tr.patterns} />
              </Paper>
            </Grid>

            <Grid xs={12}>
              <Paper elevation={0}>
                <Typography variant="h5" component="h5" sx={{ mb: 1 }}>
                  Variables
                </Typography>
                <Variables TrIndex={i} Data={tr.variables} />
              </Paper>
            </Grid>

            <Grid xs={12}>
              <Duplicates Index={i} Value={tr.duplicates ?? "allowed"} />
            </Grid>
          </Collapse>
        </Grid>
      </Grid>
    </Paper>
  );
}
function AddTranslationButton() {
  const dispatch = useConfigDispatch();
  return (
    <Button
      variant="outlined"
      onClick={(e) => {
        dispatch({
          type: "added_translation",
        });
      }}
      startIcon={<AddIcon />}
    >
      Add New Translation
    </Button>
  );
}
export default function TranslationsPane() {
  const config = useConfig();
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const translations = config.translations.map((tr, i) => {
    return <Translation Index={i} Translation={tr} Details={checked} />;
  });

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ margin: 2 }}>
        <AddTranslationButton />
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Show Details"
        />
      </Stack>
      {translations}
    </>
  );
}
