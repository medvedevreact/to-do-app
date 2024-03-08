import React, { useState } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import "./Item.css";

export const Item = ({
  addToHistory,
  setTask,
  item,
  task,
  tasks,
  id,
  setTasks,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editInput, setEditInput] = useState(item.title);

  const changeIsDone = (itemId) => {
    const updatedTask = {
      ...task,
      items: task.items.map((item) =>
        item.id === itemId ? { ...item, isDone: !item.isDone } : item
      ),
    };
    addToHistory(updatedTask);
    setTask(updatedTask);

    const updatedTasks = tasks.map((t) => (t.id === id ? updatedTask : t));
    setTasks(updatedTasks);
  };

  const handleConfirmEdit = () => {
    if (editInput.trim() !== "") {
      const updatedTask = {
        ...task,
        items: task.items.map((taskItem) =>
          taskItem.id === item.id ? { ...taskItem, title: editInput } : taskItem
        ),
      };
      addToHistory(updatedTask);
      setTask(updatedTask);
      const updatedTasks = tasks.map((t) => (t.id === id ? updatedTask : t));
      setTasks(updatedTasks);
      setIsEdit(false);
    }
  };

  const deleteItem = (itemId) => {
    const updatedTask = {
      ...task,
      items: task.items.filter((item) => item.id !== itemId),
    };
    addToHistory(updatedTask);
    setTask(updatedTask);
    const updatedTasks = tasks.map((t) => (t.id === id ? updatedTask : t));
    setTasks(updatedTasks);
  };

  const changeEditInput = (e) => {
    setEditInput(e.target.value);
  };

  return (
    <div className="task-edit-upper">
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={() => changeIsDone(item.id)}
      />
      {isEdit ? (
        <div className="task-edit">
          <input
            type="text"
            value={editInput}
            onChange={(e) => changeEditInput(e)}
          />
          <button onClick={handleConfirmEdit}>Сохранить</button>
          <button onClick={() => setIsEdit(false)}>Отмена</button>
        </div>
      ) : (
        <div className="task-edit">
          <p>{item.title}</p>
          <button onClick={() => setIsEdit(true)}>
            <FaEdit />
          </button>
          <button onClick={() => deleteItem(item.id)}>
            <FaTimes />
          </button>
        </div>
      )}
    </div>
  );
};
