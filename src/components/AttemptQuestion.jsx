import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTask } from "../context/useTask";
import PageLoader from "./PageLoader";

export default function AttemptQuestion() {
  const { selectedQuestion, selectedTask, answer, setAnswer, setEvaluation } =
    useTask();
  const textareaRef = useRef(null);
  const [timer, setTimer] = useState(30 * 60);
  const [running, setRunning] = useState(false);
  const [answerProcessing, setAnswerProcessing] = useState(false);
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

  useEffect(() => {
    if (running && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [running]);

  const formatTime = (t) =>
    `${Math.floor(t / 60)
      .toString()
      .padStart(2, "0")}:${(t % 60).toString().padStart(2, "0")}`;

  const handleSubmit = () => {
    setRunning(false);
    setAnswerProcessing(true);
    // console.log("answer: ", answer);

    const apiUrl = "https://writing-task-evaluation-v2.onrender.com/evaluate";
    // const apiUrl = "http://127.0.0.1:5000/evaluate";

    const requestBody = {
      writing_sample: answer,
      writing_question:
        selectedTask === "1"
          ? `${selectedQuestion?.question}\n\n## Image Description:\n${selectedQuestion?.image_description}`
          : selectedQuestion?.question,
      task_type: selectedTask,
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Response from API:", data);
        setEvaluation(data?.evaluation);
        navigate("/evaluation");
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      })
      .finally(() => {
        setTimer(30 * 60);
        setAnswerProcessing(false);
      });
  };

  if (!selectedQuestion) return null;

  return (
    <>
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
          <div className="bg-gray-800 h-max p-4 rounded">
            <p className="mb-4">{selectedQuestion.question}</p>
            {imageSrc && <img src={imageSrc} alt="image" />}
          </div>

          <div>
            <textarea
              className="w-full h-full min-h-[500px] bg-gray-900 text-white p-3 rounded resize-none"
              value={answer}
              ref={textareaRef}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Write your answer here..."
              disabled={!running || timer === 0 || answerProcessing}
            />
            <button
              onClick={handleSubmit}
              disabled={!running || timer === 0 || answerProcessing}
              className="mt-4 bg-blue-600 px-4 py-2 rounded"
            >
              Submit Answer
            </button>
          </div>
        </div>
      </div>
      {answerProcessing && <PageLoader />}
    </>
  );
}
