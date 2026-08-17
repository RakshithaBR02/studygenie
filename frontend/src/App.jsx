import { useEffect, useRef, useState } from "react";
import InputSection from "./components/InputSection";
import EmptyState from "./components/EmptyState";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import FlashcardContainer from "./components/FlashcardContainer";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import { validateStudyData } from "./utils/validateStudyData";
import { generateStudyMaterial } from "./services/api";
import "./App.css";

function App() {
  const [topic, setTopic] = useState("");
  const [status, setStatus] = useState("idle");
  const [studyData, setStudyData] = useState(null);
  const [error, setError] = useState("");

  const [showQuiz, setShowQuiz] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const [quizResults, setQuizResults] = useState(null);

  const [quizQuestions, setQuizQuestions] = useState([]);

  // Stores the original quiz questions
  const [originalQuizQuestions, setOriginalQuizQuestions] =
    useState([]);

  // Stores questions that are still wrong
  const [remainingWrongQuestions, setRemainingWrongQuestions] =
    useState([]);

  const abortControllerRef = useRef(null);

  const handleGenerate = async () => {
    const trimmedTopic = topic.trim();

    if (!trimmedTopic) {
      setError("Please enter a topic to continue.");
      setStatus("error");
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setStatus("loading");
    setError("");
    setStudyData(null);
    setShowQuiz(false);
    setQuizSubmitted(false);
    setQuizResults(null);
    setQuizQuestions([]);
    setOriginalQuizQuestions([]);
    setRemainingWrongQuestions([]);

    try {
      const data = await generateStudyMaterial(
        trimmedTopic,
        controller.signal
      );

      if (controller.signal.aborted) {
        return;
      }

      const validationResult =
  validateStudyData(data);

if (!validationResult.valid) {
  throw new Error(validationResult.error);
}

setStudyData(data);
setQuizQuestions(data.quiz);
setOriginalQuizQuestions(data.quiz);

      setStatus("success");
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }

      setError(
        error.message ||
          "Unable to generate study material. Please try again."
      );

      setStatus("error");
    }
  };

  const handleRetry = () => {
  if (!topic.trim()) {
    setError("");
    setStatus("idle");
    return;
  }

  handleGenerate();
};

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setQuizSubmitted(false);
    setQuizResults(null);

    setQuizQuestions(originalQuizQuestions);
  };

  const handleQuizComplete = (answers) => {
    let correctCount = 0;
    let wrongCount = 0;
    let notAttemptedCount = 0;

    const wrongQuestions = [];

    quizQuestions.forEach((question, index) => {
      const selectedAnswer = answers[index];

      if (selectedAnswer === undefined) {
        notAttemptedCount++;
        return;
      }

      if (selectedAnswer === question.correctAnswer) {
        correctCount++;
      } else {
        wrongCount++;
        wrongQuestions.push(question);
      }
    });

    /*
     * If this is the original quiz, calculate the result
     * normally.
     */
    if (quizQuestions === originalQuizQuestions) {
      setQuizResults({
        totalQuestions: originalQuizQuestions.length,
        correctCount,
        wrongCount,
        notAttemptedCount,
        wrongQuestions,
      });

      setRemainingWrongQuestions(wrongQuestions);
      setQuizSubmitted(true);

      return;
    }

    /*
     * This is a retry quiz.
     *
     * The retry contains only previously wrong questions.
     * Therefore:
     *
     * original correct
     * +
     * newly corrected retry questions
     * =
     * updated correct count
     */

    const previousWrongCount = remainingWrongQuestions.length;

    const newlyCorrect = previousWrongCount - wrongCount;

    const previousResults = quizResults;

    const updatedCorrectCount =
      previousResults.correctCount + newlyCorrect;

    const updatedWrongCount = wrongCount;

    const updatedNotAttemptedCount =
      previousResults.notAttemptedCount;

    setQuizResults({
      totalQuestions: originalQuizQuestions.length,
      correctCount: updatedCorrectCount,
      wrongCount: updatedWrongCount,
      notAttemptedCount: updatedNotAttemptedCount,
      wrongQuestions,
    });

    setRemainingWrongQuestions(wrongQuestions);
    setQuizSubmitted(true);
  };

  const handleRetryWrong = () => {
    if (remainingWrongQuestions.length === 0) {
      return;
    }

    setQuizQuestions(remainingWrongQuestions);
    setQuizSubmitted(false);
  };

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">StudyGenie</div>
      </header>

      <main className="main-content">
        <section className="hero-section">
          <div className="hero-badge">
            AI-Powered Learning
          </div>

          <h1>Learn smarter with StudyGenie</h1>

          <p className="hero-description">
            Enter any topic and generate AI-powered flashcards
            and quizzes to make your learning more effective.
          </p>

          <InputSection
            topic={topic}
            setTopic={setTopic}
            onGenerate={handleGenerate}
            disabled={status === "loading"}
          />
        </section>

        <section className="content-section">
          {status === "idle" && <EmptyState />}

          {status === "loading" && <LoadingState />}

          {status === "error" && (
            <ErrorState
              message={error}
              onRetry={handleRetry}
            />
          )}

          {status === "success" &&
            studyData &&
            !showQuiz && (
              <FlashcardContainer
                flashcards={studyData.flashcards}
                onStartQuiz={handleStartQuiz}
              />
            )}

          {status === "success" &&
            studyData &&
            showQuiz &&
            !quizSubmitted && (
              <Quiz
                questions={quizQuestions}
                onComplete={handleQuizComplete}
              />
            )}

          {status === "success" &&
            studyData &&
            showQuiz &&
            quizSubmitted &&
            quizResults && (
              <Results
                totalQuestions={
                  quizResults.totalQuestions
                }
                correctCount={
                  quizResults.correctCount
                }
                wrongCount={
                  quizResults.wrongCount
                }
                notAttemptedCount={
                  quizResults.notAttemptedCount
                }
                hasWrongAnswers={
                  quizResults.wrongQuestions.length > 0
                }
                onRetryWrong={handleRetryWrong}
              />
            )}
        </section>
      </main>
    </div>
  );
}

export default App;