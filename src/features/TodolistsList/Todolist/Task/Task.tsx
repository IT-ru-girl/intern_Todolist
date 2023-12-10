import React, { ChangeEvent, useCallback } from "react";
import './Task.scss'
import { EditableSpan } from "common/components/EditableSpan/EditableSpan";

import { TaskStatuses } from "common/enum/enum";
import { TaskType } from "features/TodolistsList/todolidtsApi";

type TaskPropsType = {
  task: TaskType;
  todolistId: string;
  changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
  removeTask: (taskId: string, todolistId: string) => void;
};
export const Task = React.memo((props: TaskPropsType) => {
  const onClickHandler = useCallback(
    () => props.removeTask(props.task.id, props.todolistId),
    [props.task.id, props.todolistId]
  );

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked;
      props.changeTaskStatus(
        props.task.id,
        newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
        props.todolistId
      );
    },
    [props.task.id, props.todolistId]
  );

  const onTitleChangeHandler = useCallback(
    (newValue: string) => {
      props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    },
    [props.task.id, props.todolistId]
  );
    const isCompleted = props.task.status === TaskStatuses.Completed;
    const taskClassName = isCompleted ? 'is-done' : '';

  return (

      <div key={props.task.id} className={taskClassName}>
          <input
              type="checkbox"
              checked={isCompleted}
              className="checkbox"
              onChange={onChangeHandler}
          />
          <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />

          <button
              className="delete-button"
              onClick={onClickHandler}
          >
              Delete
          </button>
      </div>
  );
});
