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
      {/*<div className="container">*/}
      <div className="header">
        <div className="nav">
          {/*<button className="menu-button" aria-label="menu">*/}
          {/*  <span className="menu-icon"></span>*/}
          {/*</button>*/}
          <h1 className="title">TODOLIST</h1>
          {isLoggedIn && (
            <button className="logout-button" onClick={onClickHandler}>
              Log out
            </button>
          )}
        </div>
      </div>
      {status === "loading" && <div className="linear-progress"></div>}
      <div>
        <Routes>
          <Route path={"/"} element={<TodolistsList />} />
          <Route path={"/login"} element={<Login />} />
        </Routes>
      </div>
      {/*</div>*/}
    </div>
  );
}

export default App;
