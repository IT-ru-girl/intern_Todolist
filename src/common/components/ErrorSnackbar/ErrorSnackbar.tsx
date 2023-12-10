import React from "react";
import { useSelector } from "react-redux";
import './ErrorSnackbar.scss'

import { appActions } from "app/app.reducer";
import { selectAppError } from "app/app.selectors";
import { useAppDispatch } from "common/hooks/useAppDispatch";

const Alert = React.forwardRef<HTMLDivElement>(function Alert(props, ref) {
  return <div  ref={ref}  {...props} />;
});

export function ErrorSnackbar() {
  const error = useSelector(selectAppError);
  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(appActions.setAppError({ error: null }));
  };

  const isOpen = error !== null;

  return (
    <div className={`snackbar ${isOpen ? 'open' : ''}`}>
      <div className="alert" onClick={handleClose}>
        {error}
      </div>
    </div>
  );
}
