import { useNavigate } from "react-router-dom";
import data from "../utilities/data.json";
import { useTask } from "../context/useTask";
import { useEffect } from "react";

export default function QuestionsList() {
  const { selectedTask, setSelectedQuestion } = useTask();
  const navigate = useNavigate();

  const questions = data.ielts_writing[`task_${selectedTask}`] || [];

  const handleClick = (question) => {
    setSelectedQuestion(question);
    navigate("/attempt");
  };

  const getImage = (item) => {
    const image = item?.image_name
      ? new URL(`../assets/${item.image_name}.png`, import.meta.url).href
      : null;

    return image;
  };

  useEffect(() => {
    if (!selectedTask) {
      navigate("/");
    }
    // console.log("selectedTask: ", selectedTask, typeof selectedTask);
  }, [selectedTask, navigate]);

  return (
    <div className="p-6 text-white bg-[#0f1525] min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">
        Task {selectedTask}: Select a question
      </h2>
      <ul className="space-y-4">
        {questions.map((q) => (
          <li
            key={q.id}
            className="bg-gray-800 p-4 rounded cursor-pointer hover:bg-gray-700"
            onClick={() => handleClick(q)}
          >
            <p>{q.question}</p>
            {selectedTask === "1" && (
              <div className="flex justify-end">
                <img className="w-40" src={getImage(q)} alt="image" />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
