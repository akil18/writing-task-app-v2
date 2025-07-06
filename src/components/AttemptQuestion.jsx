import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTask } from "../context/useTask";

export default function AttemptQuestion() {
  const { selectedQuestion } = useTask();
  const [timer, setTimer] = useState(30 * 60);
  const [running, setRunning] = useState(false);
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedQuestion) navigate("/");
  }, [selectedQuestion, navigate]);

  const imageSrc = selectedQuestion?.image_name
    ? new URL(`../assets/${selectedQuestion.image_name}.png`, import.meta.url)
        .href
    : null;

  useEffect(() => {
    let interval = null;
    if (running && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setRunning(false);
    }
    return () => clearInterval(interval);
  }, [running, timer]);

  const formatTime = (t) =>
    `${Math.floor(t / 60)
      .toString()
      .padStart(2, "0")}:${(t % 60).toString().padStart(2, "0")}`;

  if (!selectedQuestion) return null;

  return (
    <div className="min-h-screen p-6 bg-[#0f1525] text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Attempt Question</h2>
        <button
          onClick={() => setRunning(true)}
          disabled={running}
          className="bg-red-600 px-4 py-2 rounded"
        >
          {running ? formatTime(timer) : "Start Timer"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded">
          <p className="mb-4">{selectedQuestion.question}</p>
          {imageSrc && <img src={imageSrc} alt="image" />}
        </div>

        <div>
          <textarea
            className="w-full h-64 bg-gray-900 text-white p-3 rounded resize-none"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your answer here..."
            disabled={!running || timer === 0}
          />
          <button
            onClick={() => alert("Answer submitted!")}
            disabled={!running || timer === 0}
            className="mt-4 bg-blue-600 px-4 py-2 rounded"
          >
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  );
}
