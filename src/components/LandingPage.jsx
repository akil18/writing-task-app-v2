import { useNavigate } from "react-router-dom";
import { useTask } from "../context/useTask";

export default function LandingPage() {
  const { setSelectedTask } = useTask();
  const navigate = useNavigate();

  const handleSelect = (task) => {
    setSelectedTask(task);
    navigate("/questions");
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center gap-6 bg-[#0f1525] text-white">
      <p className="text-2xl font-bold">IELTS Writing Practice</p>
      <div className="flex gap-4">
        <button
          onClick={() => handleSelect("task_1")}
          className="bg-blue-600 px-6 py-3 rounded text-white text-lg"
        >
          Task 1
        </button>
        <button
          onClick={() => handleSelect("task_2")}
          className="bg-green-600 px-6 py-3 rounded text-white text-lg"
        >
          Task 2
        </button>
      </div>
    </div>
  );
}
