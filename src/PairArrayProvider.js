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
function AddItem({ ItemName, AddAction, TitlePair }) {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const dispatch = useConfigDispatch();
  const placeholder = "Add " + ItemName;
  return (
    <>
      <Stack direction="row" spacing={2}>
        <TextField
          id="outlined-basic"
          fullWidth
          label={TitlePair[0]}
          variant="outlined"
          value={text1}
          size="small"
          onChange={(e) => setText1(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          fullWidth
          label={TitlePair[1]}
          variant="outlined"
          value={text2}
          size="small"
          onChange={(e) => setText2(e.target.value)}
        />

        <IconButton aria-label="add">
          <AddIcon
            onClick={() => {
              dispatch(AddAction(text1, text2));
              setText1("");
              setText2("");
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
  const editInput1 = <input defaultValue={Text1} ref={textInput1} />;
  const editInput2 = <input defaultValue={Text2} ref={textInput2} />;
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
        <TableCell> {editInput1}</TableCell>
        <TableCell>{editInput2}</TableCell>
        <TableCell>{saveButton}</TableCell>
      </>
    );
  } else {
    ItemContent = (
      <>
        <TableCell> {Text1}</TableCell>
        <TableCell>{Text2}</TableCell>
        <TableCell>{editButton}</TableCell>
      </>
    );
  }
  return (
    <>
      {ItemContent}
      {deleteButton}
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
      <TableRow key={i}>
        <Item
          key={i + text[0] + text[1]}
          Index={i}
          Text1={text[0]}
          Text2={text[1]}
          EditAction={EditAction}
          DeleteAction={DeleteAction}
        />
      </TableRow>
    );
  });
  return (
    <>
      <AddItem
        ItemName={ItemName}
        AddAction={AddAction}
        TitlePair={TitlePair}
      />

      <Stack direction="column">
        <TableContainer component={Paper}>
          <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{TitlePair[0]}</TableCell>
                <TableCell>{TitlePair[1]}</TableCell>
                <TableCell style={{ width: 30 }}></TableCell>
                <TableCell style={{ width: 30 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{items}</TableBody>
          </Table>
        </TableContainer>
      </Stack>
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
