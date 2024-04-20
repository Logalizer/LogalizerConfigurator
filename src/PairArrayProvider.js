import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useConfigDispatch } from "./ConfigContext.js";
import React from "react";
import { Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Grid from "@mui/material/Unstable_Grid2";

function AddItem({ ItemName, AddAction, TitlePair }) {
  const text1Input = React.createRef();
  const text2Input = React.createRef();
  const dispatch = useConfigDispatch();
  const placeholder = "Add " + ItemName;
  return (
    <>
      <Stack direction="row" spacing={2}>
        <TextField
          id="outlined-basic"
          fullWidth
          inputRef={text1Input}
          label={TitlePair[0]}
          variant="outlined"
          size="small"
        />
        <TextField
          id="outlined-basic"
          fullWidth
          inputRef={text2Input}
          label={TitlePair[1]}
          variant="outlined"
          size="small"
        />

        <IconButton aria-label="add">
          <AddIcon
            onClick={() => {
              console.log(
                "ap",
                text1Input.current.value,
                text2Input.current.value
              );
              dispatch(
                AddAction(text1Input.current.value, text2Input.current.value)
              );
              text1Input.current.value = "";
              text2Input.current.value = "";
            }}
          />
        </IconButton>
      </Stack>
    </>
  );
}

function Item({ Index, Text1, Text2, EditAction, DeleteAction }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useConfigDispatch();
  let ItemContent;
  const textInput1 = React.createRef();
  const textInput2 = React.createRef();
  const editInput1 = (
    <TextField
      id="outlined-basic"
      fullWidth
      defaultValue={Text1}
      inputRef={textInput1}
      variant="outlined"
      size="small"
    />
  );
  const editInput2 = (
    <TextField
      id="outlined-basic"
      fullWidth
      defaultValue={Text2}
      inputRef={textInput2}
      variant="outlined"
      size="small"
    />
  );
  const saveButton = (
    <IconButton aria-label="save">
      <SaveIcon
        onClick={(e) => {
          dispatch(
            EditAction(
              Index,
              textInput1.current.value,
              textInput2.current.value
            )
          );
          setIsEditing(false);
        }}
      />
    </IconButton>
  );
  const editButton = (
    <IconButton aria-label="edit">
      <EditIcon onClick={() => setIsEditing(true)} />
    </IconButton>
  );
  const deleteButton = (
    <IconButton aria-label="delete">
      <DeleteIcon
        onClick={(e) => {
          dispatch(DeleteAction(Index, Text1));
        }}
      />
    </IconButton>
  );
  if (isEditing) {
    ItemContent = (
      <>
        <Grid xs={6}> {editInput1}</Grid>
        <Grid xs={5}> {editInput2}</Grid>
        <Grid xs="auto"> {saveButton}</Grid>
      </>
    );
  } else {
    ItemContent = (
      <>
        <Grid xs={6}> {Text1}</Grid>
        <Grid xs={5}> {Text2}</Grid>
        <Grid xs="auto"> {editButton}</Grid>
      </>
    );
  }
  return (
    <>
      {ItemContent}
      <Grid xs="auto"> {deleteButton}</Grid>
    </>
  );
}
// Bug: Some times add is not working
// Bug: When a big text is added then the column width gets adjusted
export default function PairArrayProvider({
  ItemName,
  Data,
  TitlePair,
  ActionPostfix,
  AddAction = null,
  EditAction = null,
  DeleteAction = null,
}) {
  const add_type = "added_" + ActionPostfix;
  const edit_type = "edited_" + ActionPostfix;
  const delete_type = "deleted_" + ActionPostfix;
  if (AddAction === null) {
    AddAction = (text1, text2) => {
      return {
        type: add_type,
        value1: text1,
        value2: text2,
      };
    };
  }
  if (EditAction === null) {
    EditAction = (Index, text1, text2) => {
      return {
        type: edit_type,
        value1: text1,
        value2: text2,
        index: Index,
      };
    };
  }
  if (DeleteAction === null) {
    DeleteAction = (Index, text1) => {
      return {
        type: delete_type,
        index: Index,
        value1: text1,
      };
    };
  }
  let items = [];
  Data.forEach((text, i) => {
    items.push(
      <Item
        key={i + text[0] + text[1]}
        Index={i}
        Text1={text[0]}
        Text2={text[1]}
        EditAction={EditAction}
        DeleteAction={DeleteAction}
      />
    );
  });
  return (
    <>
      <AddItem
        ItemName={ItemName}
        AddAction={AddAction}
        TitlePair={TitlePair}
      />

      <Grid container>
        <Grid xs={6}>
          <b>{TitlePair[0]}</b>
        </Grid>
        <Grid xs={5}>
          <b>{TitlePair[1]}</b>
        </Grid>
        <Grid xs="auto"></Grid>
        <Grid xs="auto"></Grid>
        {items}
      </Grid>
    </>
  );
}

// {
//   DataParser(Data).map((text, i) => (
//     <li key={i}>
//       <Item
//         Index={i}
//         Text1={text.first}
//         Text2={text.second}
//         EditAction={EditAction}
//         DeleteAction={DeleteAction}
//       />
//     </li>
//   ))
// }
