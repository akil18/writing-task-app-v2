import { useTask } from "../context/useTask";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Evaluation() {
  const { selectedQuestion, answer, evaluation } = useTask();

  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedQuestion || !evaluation) {
      navigate("/");
    }
    console.log("evaluation: ", evaluation);
  }, [selectedQuestion, evaluation, navigate]);

  const imageSrc = selectedQuestion?.image_name
    ? new URL(`../assets/${selectedQuestion.image_name}.png`, import.meta.url)
        .href
    : null;

  if (!selectedQuestion || !evaluation) return null;

  return (
    <div className="bg-[#0f1525] text-white p-6 min-h-screen space-y-6">
      <h2 className="text-2xl font-bold mb-4">Evaluation</h2>

      <div className="bg-gray-800 p-4 rounded">
        <p className="font-semibold mb-2">Question:</p>
        <p>{selectedQuestion.question}</p>
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Task chart"
            className="mt-4 rounded max-w-64"
          />
        )}
      </div>

      <div className="bg-gray-800 p-4 rounded">
        <p className="font-semibold mb-2">Your Answer:</p>
        <p className="whitespace-pre-line">{answer}</p>
      </div>

      <div className="bg-gray-800 p-4 rounded space-y-3">
        <p className="font-semibold text-lg">Evaluation</p>
        <p>
          <strong>Score:</strong> {evaluation.score}
        </p>
        <p>
          <strong>Test Variant:</strong> {evaluation.test_variant}
        </p>
        <p>
          <strong>Word Count:</strong> {evaluation.word_count}
        </p>
        <div>
          <p className="font-semibold">Misspelled Words:</p>
          <ul className="list-disc list-inside ml-4">
            {evaluation.misspelled_words.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold">Reasoning:</p>
          <p>{evaluation.reasoning}</p>
        </div>
      </div>
    </div>
  );
}
