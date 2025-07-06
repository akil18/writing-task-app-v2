import { useState } from "react";
import { TaskContext } from "./TaskContext"; // update path if needed

export function TaskProvider({ children }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  return (
    <TaskContext.Provider
      value={{
        selectedTask,
        setSelectedTask,
        selectedQuestion,
        setSelectedQuestion,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
