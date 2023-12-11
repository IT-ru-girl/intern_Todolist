import React, { useEffect } from "react";
import "./App.scss";
import { TodolistsList } from "../features/TodolistsList/TodolistsList";
import { useAppDispatch, useAppSelector } from "./store";
import { RequestStatusType } from "./app-reducer";
import { Login } from "../features/Login/Login";
import { Route, Routes } from "react-router-dom";
import { logOutTC, meTC } from "../features/Login/auth-reducer";

function App() {
  const dispatch = useAppDispatch();
  const status = useAppSelector<RequestStatusType>((state) => state.app.status);
  const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized);
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn);

  const onClickHandler = () => {
    dispatch(logOutTC());
  };

  useEffect(() => {
    dispatch(meTC());
  }, []);

  if (!isInitialized) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="error-snackbar">
        <div className="app-bar">
          <div className="toolbar">
            <button className="menu-button" aria-label="menu">
              <span className="menu-icon"></span>
            </button>
            <h6 className="title">News</h6>
            {isLoggedIn && (
              <button className="logout-button" onClick={onClickHandler}>
                Log out
              </button>
            )}
          </div>
        </div>
        {status === "loading" && <div className="linear-progress"></div>}
      </div>
      <div>
        <Routes>
          <Route path={"/"} element={<TodolistsList />} />
          <Route path={"/login"} element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
