// Tasks.js
import React, { useContext } from "react";
import { Task } from "../Task/Task";
import { TasksContext } from "../../App";
import "./Tasks.css";

export const Tasks = ({ deleteTask }) => {
  const { tasks } = useContext(TasksContext);

  return (
    <div className="tasks-container">
      <h2 className="tasks-header">Дела:</h2>
      <ul className="tasks-list">
        {tasks.map((task, index) => (
          <li className="task-item" key={index}>
            <Task task={task} deleteTask={deleteTask} />
          </li>
        ))}
      </ul>
    </div>
  );
};
