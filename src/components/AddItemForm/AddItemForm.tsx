import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import "./AddItemForm.scss";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
  disabled?: boolean;
};

export const AddItemForm = React.memo(function ({ addItem, disabled = false }: AddItemFormPropsType) {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addItemHandler = () => {
    if (title.trim() !== "") {
      addItem(title);
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.charCode === 13) {
      addItemHandler();
    }
  };

  return (
    <div className="custom-text-field">
      <div className="field-item">
        <input
          type="text"
          className={`text-field ${error ? "error" : ""}`}
          disabled={disabled}
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          placeholder="Title"
        />
        {!!error && <div className="error-text">{error}</div>}
        <button className="add-button" onClick={addItemHandler} disabled={disabled}>
          +
        </button>
      </div>
    </div>
  );
});
