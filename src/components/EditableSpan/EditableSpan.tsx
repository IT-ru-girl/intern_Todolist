import React, { ChangeEvent, useState } from "react";
import "./EditableSpan.scss";

type EditableSpanPropsType = {
  value: string;
  onChange: (newValue: string) => void;
};

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
  console.log("EditableSpan called");
  let [editMode, setEditMode] = useState(false);
  console.log(editMode);
  let [title, setTitle] = useState(props.value);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.value);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <input className="editable-text" value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
  ) : (
    <span className="editable-value" onDoubleClick={activateEditMode}>
      {props.value}
    </span>
  );
});
