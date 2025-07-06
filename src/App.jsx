import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import QuestionsList from "./components/QuestionsList";
import AttemptQuestion from "./components/AttemptQuestion";
import { TaskProvider } from "./context/TaskProvider";

function App() {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/questions" element={<QuestionsList />} />
          <Route path="/attempt" element={<AttemptQuestion />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default App;
