import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useConfigDispatch } from "./ConfigContext.js";
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

import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Title } from "@mui/icons-material";

function ContentBox(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        fontSize: "0.875rem",
        ...sx,
      }}
      {...other}
    />
  );
}

ContentBox.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

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

function Item({ Index, Text1, Text2, id, key, EditAction, DeleteAction }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useConfigDispatch();
  let ItemContent;
  const textInput1 = React.createRef();
  const textInput2 = React.createRef();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
        {" "}
        <ContentBox sx={{ flexGrow: 1 }}>{editInput1}</ContentBox>
        <ContentBox sx={{ flexGrow: 1 }}>{editInput2}</ContentBox>
        <ContentBox>
          <Stack direction="row">
            {saveButton}
            {deleteButton}
          </Stack>
        </ContentBox>
      </>
    );
  } else {
    ItemContent = (
      <>
        <ContentBox sx={{ flexGrow: 1 }}>{Text1}</ContentBox>
        <ContentBox sx={{ flexGrow: 1 }}>{Text2}</ContentBox>

        <ContentBox>
          <Stack direction="row">
            {editButton}
            {deleteButton}
          </Stack>
        </ContentBox>
      </>
    );
  }
  return (
    <>
      <Box
        ref={setNodeRef}
        style={style}
        sx={{
          display: "flex",
          bgcolor: "background.paper",
          borderRadius: 1,
          alignItems: "center",
        }}
      >
        {ItemContent}
        <div className="dragHandle" {...attributes} {...listeners}>
          <DragIndicatorIcon />
        </div>
      </Box>
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
  DragAction = null,
}) {
  const dispatch = useConfigDispatch();
  const add_type = "added_" + ActionPostfix;
  const edit_type = "edited_" + ActionPostfix;
  const delete_type = "deleted_" + ActionPostfix;
  const drag_type = "dragged_" + ActionPostfix;

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
  if (DragAction === null) {
    DragAction = (activeIndex, overIndex) => {
      return {
        type: drag_type,
        activeIndex: activeIndex,
        overIndex: overIndex,
      };
    };
  }

  let items = [];
  Data.forEach((text, i) => {
    items.push(
      <Item
        key={i + text[0] + text[1]}
        id={i + text[0] + text[1]}
        Index={i}
        Text1={text[0]}
        Text2={text[1]}
        EditAction={EditAction}
        DeleteAction={DeleteAction}
      />
    );
  });
  let sortData = [];
  Data.forEach((text, i) => {
    sortData.push(i + text[0] + text[1]);
  });

  function DataSection() {
    if (items.length == 0) return <></>;
    return (
      <div
        style={{
          width: "100%",
          "padding-left": "20px",
          "padding-right": "15px",
          "margin-top": "5px",
        }}
      >
        {" "}
        <Box
          sx={{
            display: "flex",
            bgcolor: "background.paper",
            borderRadius: 1,
            alignItems: "center",
            paddingRight: 13,
          }}
        >
          <ContentBox sx={{ flexGrow: 1 }}>
            <b>{TitlePair[0]}</b>
          </ContentBox>
          <ContentBox sx={{ flexGrow: 1 }}>
            <b>{TitlePair[1]}</b>
          </ContentBox>
        </Box>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sortData}
            strategy={verticalListSortingStrategy}
          >
            <>{items}</>
          </SortableContext>
        </DndContext>
      </div>
    );
  }

  return (
    <>
      <AddItem
        ItemName={ItemName}
        AddAction={AddAction}
        TitlePair={TitlePair}
      />
      <DataSection />
    </>
  );
  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const activeIndex = sortData.indexOf(active.id);
      const overIndex = sortData.indexOf(over.id);

      dispatch(DragAction(activeIndex, overIndex));
    }
  }
}
