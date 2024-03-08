import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./TaskPage.css";
import { v4 as uuidv4 } from "uuid";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { BsArrowClockwise } from "react-icons/bs";
import { TasksContext } from "../../App";
import { Item } from "../../components/Item/Item";

export const TaskPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { tasks, setTasks } = useContext(TasksContext);

  const [task, setTask] = useState(tasks.find((el) => el.id === id));
  const [addItemInput, setAddItemInput] = useState("");

  const [historyIndex, setHistoryIndex] = useState(0);
  const [taskHistory, setTaskHistory] = useState([task]);

  const addItem = () => {
    const itemObj = {
      title: addItemInput,
      isDone: false,
      id: uuidv4(),
    };
    const updatedTask = {
      ...task,
      items: [...task.items, itemObj],
    };
    setTask(updatedTask);
    addToHistory(updatedTask);
    const updatedTasks = tasks.map((t) => (t.id === id ? updatedTask : t));
    setTasks(updatedTasks);
    setAddItemInput("");
  };

  const addToHistory = (updatedTask) => {
    const newHistory = taskHistory.slice(0, historyIndex + 1);
    setTaskHistory([...newHistory, updatedTask]);
    setHistoryIndex(newHistory.length);
  };

  const rollbackTask = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setTask(taskHistory[newIndex]);
    }
  };

  const advanceTask = () => {
    if (historyIndex < taskHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setTask(taskHistory[newIndex]);
    }
  };

  const cancelChanges = () => {
    setTask(taskHistory[0]);
    setHistoryIndex(0);
    const updatedTasks = tasks.map((t) => (t.id === id ? taskHistory[0] : t));
    console.log(updatedTasks);
    setTasks(updatedTasks);

    navigate("/");
  };

  const removeTask = () => {
    const newTasks = tasks.filter((t) => t.id !== id);
    setTasks(newTasks);
    navigate("/");
  };

  return (
    <div className="task-page-container">
      <h2>{task.title}</h2>
      <div className="add-item-container">
        <input
          type="text"
          value={addItemInput}
          onChange={(e) => setAddItemInput(e.target.value)}
          className="add-item-input"
          placeholder="Добавить элемент"
        />
        <button onClick={addItem} className="add-item-button">
          Добавить
        </button>
      </div>
      <div>
        {task.items.map((item, index) => (
          <Item
            addToHistory={addToHistory}
            setTask={setTask}
            key={item.id}
            item={item}
            task={task}
            tasks={tasks}
            id={id}
            setTasks={setTasks}
          />
        ))}
      </div>
      <div className="task-buttons">
        <button onClick={rollbackTask}>
          <BsArrowCounterclockwise /> Назад
        </button>
        <button onClick={advanceTask}>
          Вперёд <BsArrowClockwise />
        </button>
        <Link to="/">
          <button>Сохранить</button>
        </Link>
        <button onClick={cancelChanges}>Отменить</button>
        <button onClick={removeTask}>Удалить</button>
      </div>
    </div>
  );
};
