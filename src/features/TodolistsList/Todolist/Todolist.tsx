import React, { useCallback, useEffect } from "react";
import { AddItemForm } from "../../../components/AddItemForm/AddItemForm";
import { EditableSpan } from "../../../components/EditableSpan/EditableSpan";
import { Task } from "./Task/Task";
import { TaskStatuses, TaskType } from "../../../api/todolists-api";
import { FilterValuesType, TodolistDomainType } from "../todolists-reducer";
import { fetchTasksTC } from "../tasks-reducer";
import { useAppDispatch } from "../../../app/store";
import "./Todolist.scss";

type PropsType = {
  todolist: TodolistDomainType;
  tasks: Array<TaskType>;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
  removeTask: (taskId: string, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
};

export const Todolist = React.memo(function ({ ...props }: PropsType) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("3");
    const thunk = fetchTasksTC(props.todolist.id);
    dispatch(thunk);
  }, []);

  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.todolist.id);
    },
    [props.addTask, props.todolist.id]
  );

  const removeTodolist = () => {
    props.removeTodolist(props.todolist.id);
  };
  const changeTodolistTitle = useCallback(
    (title: string) => {
      props.changeTodolistTitle(props.todolist.id, title);
    },
    [props.todolist.id, props.changeTodolistTitle]
  );

  const onAllClickHandler = useCallback(
    () => props.changeFilter("all", props.todolist.id),
    [props.todolist.id, props.changeFilter]
  );
  const onActiveClickHandler = useCallback(
    () => props.changeFilter("active", props.todolist.id),
    [props.todolist.id, props.changeFilter]
  );
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter("completed", props.todolist.id),
    [props.todolist.id, props.changeFilter]
  );

  let tasksForTodolist = props.tasks;

  if (props.todolist.filter === "active") {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (props.todolist.filter === "completed") {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <div className="todo">
      <h3 className="todo-header">
        <EditableSpan value={props.todolist.title} onChange={changeTodolistTitle} />
        <button
          className={`delete-button${props.todolist.entityStatus === "loading" ? " disabled" : ""}`}
          onClick={removeTodolist}
          disabled={props.todolist.entityStatus === "loading"}
        >
          <span className="delete-icon">&times;</span>
        </button>
      </h3>
      <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === "loading"} />
      <div className="task-column">
        {tasksForTodolist.map((t) => {
          return (
            <div>
              <Task
                key={t.id}
                task={t}
                todolistId={props.todolist.id}
                removeTask={props.removeTask}
                changeTaskTitle={props.changeTaskTitle}
                changeTaskStatus={props.changeTaskStatus}
              />
            </div>
          );
        })}
      </div>
      <div className="button-container" style={{ paddingTop: "10px" }}>
        <button
          className={`filter-button ${props.todolist.filter === "all" ? "outlined" : "text"}`}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={`filter-button ${props.todolist.filter === "active" ? "outlined" : "text"}`}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={`filter-button ${props.todolist.filter === "completed" ? "outlined" : "text"}`}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
});
