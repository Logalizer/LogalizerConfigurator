import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useConfigDispatch } from "./ConfigContext.js";
import React from "react";

function AddItem({ ItemName, AddAction }) {
  const [text, setText] = useState("");
  const dispatch = useConfigDispatch();
  const placeholder = "Add " + ItemName;
  return (
    <>
      <input
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          if (text.length === 0) return;
          dispatch(AddAction(text));
          setText("");
        }}
      >
        Add
      </button>
    </>
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
        <input defaultValue={Text} ref={textInput} />
        <button
          onClick={(e) => {
            if (textInput.current.value.length === 0) return;
            dispatch(EditAction(Index, textInput.current.value));
            setIsEditing(false);
          }}
        >
          Save
        </button>
      </>
    );
  } else {
    ItemContent = (
      <>
        {Text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      {ItemContent}
      <button
        onClick={(e) => {
          dispatch(DeleteAction(Index));
        }}
      >
        Delete
      </button>
    </label>
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
      <ul>
        {Data.map((text, i) => (
          <li key={i}>
            <Item
              Index={i}
              Text={text}
              EditAction={EditAction}
              DeleteAction={DeleteAction}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
