import React from "react";
import "./Modal.css";

export const Modal = ({
  closeModal,
  addInput,
  onChangeInput,
  onAddNewTask,
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <input type="text" value={addInput} onChange={onChangeInput} />
        <button onClick={onAddNewTask}>Добавить</button>
        <button onClick={closeModal}>Отмена</button>
      </div>
    </div>
  );
};
