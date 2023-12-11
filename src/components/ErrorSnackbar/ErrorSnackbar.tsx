import React from "react";
import "./ErrorSnackbar.scss";
import { setAppErrorAC } from "../../app/app-reducer";
import { useAppDispatch, useAppSelector } from "../../app/store";

export function ErrorSnackbar() {
  const error = useAppSelector<string | null>((state) => state.app.error);

  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent<any> | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setAppErrorAC(null));
  };

  const isOpen = error !== null;

  return (
    <div className={`snackbar ${isOpen ? "open" : ""}`}>
      <div className="alert" onClick={handleClose}>
        {error}
      </div>
    </div>
  );
}
