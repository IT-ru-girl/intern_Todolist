import React, { useCallback, useEffect } from "react";
import "./App.scss";
import { TodolistsList } from "features/TodolistsList/TodolistsList";

import { useSelector } from "react-redux";
import { initializeAppTC } from "app/app.reducer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { logoutTC } from "features/auth/auth.reducer";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { selectIsLoggedIn } from "features/auth/auth.selectors";
import { selectAppStatus, selectIsInitialized } from "app/app.selectors";
import { Login } from "features/auth/Login/Login";


type PropsType = {
  demo?: boolean;
};

function App({ demo = false }: PropsType) {
  const status = useSelector(selectAppStatus);
  const isInitialized = useSelector(selectIsInitialized);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  const logoutHandler = useCallback(() => {
    dispatch(logoutTC());
  }, []);

  if (!isInitialized) {
    return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
    );
  }
  return (
    <BrowserRouter>
      <div className="App">
        <div className="error-snackbar">
          <div className="app-bar">
            <div className="toolbar">
              <button className="menu-button" aria-label="menu">
                <span className="menu-icon"></span>
              </button>
              <h6 className="title">News</h6>
              {isLoggedIn && (
                  <button className="logout-button" onClick={logoutHandler}>
                    Log out
                  </button>
              )}
            </div>
          </div>
          {status === "loading" && <div className="linear-progress"></div>}
        </div>
        <div className="container">
          <Routes>
            <Route path={"/"} element={<TodolistsList demo={demo} />} />
            <Route path={"/login"} element={<Login />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
