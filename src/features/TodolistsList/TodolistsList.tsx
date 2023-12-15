import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import {
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValuesType,
  removeTodolistTC,
  TodolistDomainType,
} from "./todolists-reducer";
import { addTaskTC, removeTaskTC, TasksStateType, updateTaskTC } from "./tasks-reducer";
import { TaskStatuses } from "../../api/todolists-api";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import { Todolist } from "./Todolist/Todolist";
import { Navigate } from "react-router-dom";
import "./TodolistsList.scss";

import "../../app/App.scss";

export const TodolistsList: React.FC = () => {
  const todolists = useAppSelector<Array<TodolistDomainType>>((state) => state.todolists);
  const tasks = useAppSelector<TasksStateType>((state) => state.tasks);
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    console.log("2");
    if (!isLoggedIn) return;
    const thunk = fetchTodolistsTC();
    dispatch(thunk);
  }, []);

  const removeTask = useCallback(function (id: string, todolistId: string) {
    const thunk = removeTaskTC(id, todolistId);
    dispatch(thunk);
  }, []);

  const addTask = useCallback(function (title: string, todolistId: string) {
    const thunk = addTaskTC(title, todolistId);
    dispatch(thunk);
  }, []);

  const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
    const thunk = updateTaskTC(id, { status }, todolistId);
    dispatch(thunk);
  }, []);

  const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
    const thunk = updateTaskTC(id, { title: newTitle }, todolistId);
    dispatch(thunk);
  }, []);

  const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
    const action = changeTodolistFilterAC(todolistId, value);
    dispatch(action);
  }, []);

  const removeTodolist = useCallback(function (id: string) {
    const thunk = removeTodolistTC(id);
    dispatch(thunk);
  }, []);

  const changeTodolistTitle = useCallback(function (id: string, title: string) {
    const thunk = changeTodolistTitleTC(id, title);
    dispatch(thunk);
  }, []);

  const addTodolist = useCallback(
    (title: string) => {
      const thunk = addTodolistTC(title);
      dispatch(thunk);
    },
    [dispatch]
  );

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <main className="todo-block">
      <div className="container todo-container">
        <div className="add-item-form">
          <AddItemForm addItem={addTodolist} />
        </div>

        <div className="todos">
          {todolists.map((tl) => {
            let allTodolistTasks = tasks[tl.id];
            return (
              <div className="todo-column" key={tl.id}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};
