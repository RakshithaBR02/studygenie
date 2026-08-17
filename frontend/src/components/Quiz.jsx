import { useState } from "react";
import QuizQuestion from "./QuizQuestion";

function Quiz({ questions, onComplete }) {
    if (!questions || questions.length === 0) {
    return (
      <section className="study-preview">
        <h2>No quiz questions available</h2>
        <p>
          No quiz questions were generated for this study set.
        </p>
      </section>
    );
  }
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const selectedAnswer = answers[currentIndex];

  const handleSelectAnswer = (optionIndex) => {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [currentIndex]: optionIndex,
    }));
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((previousIndex) => previousIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((previousIndex) => previousIndex + 1);
    }
  };

  const handleSubmit = () => {
    onComplete(answers);
  };

  const progress =
    ((currentIndex + 1) / totalQuestions) * 100;

  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <section className="quiz-section">
      <div className="section-heading">
        <div>
          <span className="section-label">QUIZ</span>

          <h2>Test your understanding</h2>
        </div>

        <span className="card-counter">
          Question {currentIndex + 1} / {totalQuestions}
        </span>
      </div>

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      <QuizQuestion
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={handleSelectAnswer}
      />

      <div className="quiz-navigation">
        <button
          type="button"
          className="secondary-button"
          onClick={handlePrevious}
          disabled={isFirstQuestion}
        >
          ← Previous
        </button>

        {!isLastQuestion ? (
          <button
            type="button"
            className="primary-button"
            onClick={handleNext}
          >
            Next Question →
          </button>
        ) : (
          <button
            type="button"
            className="primary-button"
            onClick={handleSubmit}
          >
            Submit Quiz
          </button>
        )}
      </div>

      <p className="quiz-hint">
        {selectedAnswer === undefined
          ? "You can skip this question and return to it later."
          : "You can change your answer before submitting."}
      </p>
    </section>
  );
}

export default Quiz;