import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage/HomePage";
import { TaskPage } from "./pages/TaskPage/TaskPage";
import { createContext, useState } from "react";

export const TasksContext = createContext();

function App() {
  const [tasks, setTasks] = useState([]);
  return (
    <div className="App">
      <TasksContext.Provider value={{ tasks, setTasks }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/task/:id" element={<TaskPage />} />
        </Routes>
      </TasksContext.Provider>
    </div>
  );
}

export default App;
