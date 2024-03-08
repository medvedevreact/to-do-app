import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TasksContext } from "../../App";
import { Tasks } from "../../components/Tasks/Tasks";
import { Modal } from "../../components/Modal/Modal";
import "./HomePage.css";

export const HomePage = () => {
  const { tasks, setTasks } = useContext(TasksContext);

  const [addInput, setAddInput] = useState("");
  const [showModal, setShowModal] = useState(false);

  const addNewTask = (newTask) => {
    if (newTask.trim() !== "") {
      const newTaskObj = {
        id: uuidv4(),
        title: newTask,
        items: [],
      };
      const newTasks = [...tasks, newTaskObj];
      setTasks(newTasks);
      setShowModal(false);
    }
  };

  const changeInput = (e) => {
    setAddInput(e.target.value);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  return (
    <div className="container">
      <button
        className="button"
        onClick={() => {
          setShowModal(true);
        }}
      >
        + Создать новую группу
      </button>
      <Tasks deleteTask={deleteTask} />
      {showModal && (
        <Modal
          closeModal={() => setShowModal(false)}
          addInput={addInput}
          onChangeInput={changeInput}
          onAddNewTask={() => {
            addNewTask(addInput);
            setAddInput("");
          }}
        />
      )}
    </div>
  );
};
