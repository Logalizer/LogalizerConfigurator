import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";

import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useConfigDispatch } from "./ConfigContext.js";
import Paper from "@mui/material/Paper";

import React from "react";

function AddItem({ ItemName, AddAction }) {
  // const [text, setText] = useState("");
  const textInput = React.createRef();
  const dispatch = useConfigDispatch();
  const placeholder = "Add " + ItemName;
  return (
    <Stack direction="row" spacing={2}>
      <TextField
        id="outlined-basic"
        fullWidth
        inputRef={textInput}
        label={placeholder}
        variant="outlined"
        size="small"
      />
      <IconButton aria-label="add">
        <AddIcon
          onClick={() => {
            if (textInput.current.value.length === 0) return;
            dispatch(AddAction(textInput.current.value));
            textInput.current.value = "";
          }}
        />
      </IconButton>
    </Stack>
  );
}

function Item({ Index, Text, EditAction, DeleteAction }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useConfigDispatch();
  let ItemContent;
  let text;
  const textInput = React.createRef();
  if (isEditing) {
    ItemContent = (
      <>
        <IconButton aria-label="save">
          <SaveIcon
            onClick={(e) => {
              if (textInput.current.value.length === 0) return;
              dispatch(EditAction(Index, textInput.current.value));
              setIsEditing(false);
            }}
          />
        </IconButton>
        <TextField
          id="outlined-basic"
          defaultValue={Text}
          inputRef={textInput}
          size="small"
        />
      </>
    );
  } else {
    ItemContent = (
      <>
        <IconButton aria-label="edit">
          <EditIcon onClick={() => setIsEditing(true)} />
        </IconButton>
        {Text}
      </>
    );
  }
  return (
    <>
      <IconButton aria-label="delete">
        <DeleteIcon
          onClick={(e) => {
            dispatch(DeleteAction(Index));
          }}
        />
      </IconButton>
      {ItemContent}
    </>
  );
}

export default function ArrayProvider({
  ItemName,
  Data,
  ActionPostfix,
  AddAction = null,
  EditAction = null,
  DeleteAction = null,
}) {
  const add_type = "added_" + ActionPostfix;
  const edit_type = "edited_" + ActionPostfix;
  const delete_type = "deleted_" + ActionPostfix;
  if (AddAction === null) {
    AddAction = (text) => {
      return {
        type: add_type,
        value: text,
      };
    };
  }
  if (EditAction === null) {
    EditAction = (Index, text) => {
      return {
        type: edit_type,
        value: text,
        index: Index,
      };
    };
  }
  if (DeleteAction === null) {
    DeleteAction = (Index) => {
      return {
        type: delete_type,
        index: Index,
      };
    };
  }
  return (
    <>
      <AddItem ItemName={ItemName} AddAction={AddAction} />

      <Stack direction="column">
        {Data.map((text, i) => (
          <div key={i}>
            <Item
              Index={i}
              Text={text}
              EditAction={EditAction}
              DeleteAction={DeleteAction}
            />
          </div>
        ))}
      </Stack>
    </>
  );
}
