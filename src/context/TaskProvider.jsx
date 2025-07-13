import { useState } from "react";
import { TaskContext } from "./TaskContext"; // update path if needed

export function TaskProvider({ children }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);

  return (
    <TaskContext.Provider
      value={{
        selectedTask,
        setSelectedTask,
        selectedQuestion,
        setSelectedQuestion,
        answer,
        setAnswer,
        evaluation,
        setEvaluation,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
