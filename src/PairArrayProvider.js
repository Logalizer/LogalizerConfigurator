import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useConfigDispatch } from "./ConfigContext.js";
import React from "react";
import { Stack } from "@mui/material";

function AddItem({ ItemName, AddAction }) {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const dispatch = useConfigDispatch();
  const placeholder = "Add " + ItemName;
  return (
    <>
      <input
        placeholder={placeholder}
        value={text1}
        onChange={(e) => setText1(e.target.value)}
      />
      <input
        placeholder={placeholder}
        value={text2}
        onChange={(e) => setText2(e.target.value)}
      />
      <button
        onClick={() => {
          dispatch(AddAction(text1, text2));
          setText1("");
          setText2("");
        }}
      >
        Add
      </button>
    </>
  );
}

function Item({ Index, Text1, Text2, EditAction, DeleteAction }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useConfigDispatch();
  let ItemContent;
  const textInput1 = React.createRef();
  const textInput2 = React.createRef();
  if (isEditing) {
    ItemContent = (
      <>
        <input defaultValue={Text1} ref={textInput1} />
        <input defaultValue={Text2} ref={textInput2} />

        <button
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
        >
          Save
        </button>
      </>
    );
  } else {
    ItemContent = (
      <>
        <TextField
          id="outlined-read-only-input"
          label=""
          defaultValue={Text1}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-read-only-input"
          label=""
          defaultValue={Text2}
          InputProps={{
            readOnly: true,
          }}
        />
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <>
      {ItemContent}
      <button
        onClick={(e) => {
          dispatch(DeleteAction(Index, Text1));
        }}
      >
        Delete
      </button>
    </>
  );
}

export default function PairArrayProvider({
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
      <li key={i}>
        <Item
          key={i + text[0] + text[1]}
          Index={i}
          Text1={text[0]}
          Text2={text[1]}
          EditAction={EditAction}
          DeleteAction={DeleteAction}
        />
      </li>
    );
  });
  return (
    <>
      <AddItem ItemName={ItemName} AddAction={AddAction} />
      <ul>{items}</ul>
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
