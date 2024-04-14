import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useConfigDispatch } from "./ConfigContext.js";

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
  if (isEditing) {
    ItemContent = (
      <>
        <input
          value={Text}
          onChange={(e) => {
            dispatch(EditAction(Index, e.target.value));
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
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
  AddAction,
  EditAction,
  DeleteAction,
}) {
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
