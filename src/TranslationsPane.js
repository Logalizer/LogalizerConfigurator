import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import { useConfig, useConfigDispatch } from "./ConfigContext.js";

function AddBlacklist() {
  const [text, setText] = useState("");
  const dispatch = useConfigDispatch();
  return (
    <>
      <input
        placeholder="Add Blacklist"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          dispatch({
            type: "added_blacklist",
            value: text,
          });
          setText("");
        }}
      >
        Add
      </button>
    </>
  );
}

function Blacklist({ Index, Text }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useConfigDispatch();
  let BlacklistContent;
  if (isEditing) {
    BlacklistContent = (
      <>
        <input
          value={Text}
          onChange={(e) => {
            dispatch({
              type: "edited_blacklist",
              value: e.target.value,
              index: Index,
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    BlacklistContent = (
      <>
        {Text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      {BlacklistContent}
      <button
        onClick={(e) => {
          dispatch({
            type: "deleted_blacklist",
            index: Index,
          });
        }}
      >
        Delete
      </button>
    </label>
  );
}

export default function TranslationsPane() {
  const config = useConfig();
  return (
    <>
      <AddBlacklist />
      <ul>
        {config.blacklist.map((text, i) => (
          <li key={i}>
            <Blacklist Index={i} Text={text} />
          </li>
        ))}
      </ul>
    </>
  );
}
