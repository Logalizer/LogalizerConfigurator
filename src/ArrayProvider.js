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

import PropTypes from "prop-types";
import Box from "@mui/material/Box";

import React from "react";
import { Save } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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

function AddItem({ ItemName, AddAction }) {
  // const [text, setText] = useState("");
  const textInput = React.createRef();
  const dispatch = useConfigDispatch();
  const placeholder = "Add " + ItemName;
  return (
    <Stack direction="row" spacing={2} sx={{ pr: 2 }}>
      <TextField
        id="outlined-basic"
        fullWidth
        inputRef={textInput}
        label={placeholder}
        variant="outlined"
        size="small"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (textInput.current.value.length === 0) return;
            dispatch(AddAction(textInput.current.value));
            textInput.current.value = "";
          }
        }}
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

function Item({ Index, Text, id, key, EditAction, DeleteAction }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useConfigDispatch();
  let ItemContent;
  let text;
  const textInput = React.createRef();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const SaveButton = (
    <IconButton aria-label="save">
      <SaveIcon
        onClick={(e) => {
          if (textInput.current.value.length === 0) return;
          dispatch(EditAction(Index, textInput.current.value));
          setIsEditing(false);
        }}
      />
    </IconButton>
  );

  const EditTextField = (
    <TextField
      id="outlined-basic"
      defaultValue={Text}
      inputRef={textInput}
      size="small"
    />
  );

  const EditButton = (
    <IconButton aria-label="edit">
      <EditIcon onClick={() => setIsEditing(true)} />
    </IconButton>
  );

  const DeleteButton = (
    <IconButton aria-label="delete">
      <DeleteIcon
        onClick={(e) => {
          console.log("Delete");
          dispatch(DeleteAction(Index));
        }}
      />
    </IconButton>
  );

  if (isEditing) {
    ItemContent = (
      <>
        <ContentBox sx={{ flexGrow: 1 }}>{EditTextField}</ContentBox>
        <ContentBox>
          <Stack direction="row">
            {SaveButton}
            {DeleteButton}
          </Stack>
        </ContentBox>
      </>
    );
  } else {
    ItemContent = (
      <>
        <ContentBox sx={{ flexGrow: 1 }}>{Text}</ContentBox>
        <ContentBox>
          <Stack direction="row">
            {EditButton}
            {DeleteButton}
          </Stack>
        </ContentBox>
      </>
    );
  }
  return (
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
  );
}

export default function ArrayProvider({
  ItemName,
  Data,
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
  if (DragAction === null) {
    DragAction = (activeIndex, overIndex) => {
      return {
        type: drag_type,
        activeIndex: activeIndex,
        overIndex: overIndex,
      };
    };
  }
  function DataSection() {
    if (Data.length == 0) return <></>;
    return (
      <div
        style={{
          width: "100%",
          "padding-left": "20px",
          "padding-right": "15px",
        }}
      >
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={Data} strategy={verticalListSortingStrategy}>
            <>
              {Data.map((text, i) => (
                <Item
                  Index={i}
                  key={text}
                  id={text}
                  Text={text}
                  EditAction={EditAction}
                  DeleteAction={DeleteAction}
                />
              ))}
            </>
          </SortableContext>
        </DndContext>
      </div>
    );
  }
  return (
    <>
      <AddItem ItemName={ItemName} AddAction={AddAction} />

      <DataSection />
    </>
  );
  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const activeIndex = Data.indexOf(active.id);
      const overIndex = Data.indexOf(over.id);

      dispatch(DragAction(activeIndex, overIndex));
    }
  }
}
