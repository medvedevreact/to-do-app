// Task.js
import React from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Task.css";

export const Task = ({ task, deleteTask }) => {
  return (
    <div className="task-div">
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-btns">
          <Link to={`/task/${task.id}`}>
            <button className="task-btn task-btn-edit">
              <FaEdit />
            </button>
          </Link>
          <button
            className="task-btn"
            onClick={() => {
              deleteTask(task.id);
            }}
          >
            X
          </button>
        </div>
      </div>
      {task.items.length > 0 && (
        <div>
          {task.items.slice(0, 3).map((item, index) => (
            <div className="item-div" key={index}>
              <span className="item-title">{item.title}</span>
              <input type="checkbox" checked={item.isDone} disabled={true} />
            </div>
          ))}
          {task.items.length > 3 && <p>И ещё {task.items.length - 3}</p>}
        </div>
      )}
    </div>
  );
};
