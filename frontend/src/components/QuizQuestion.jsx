function QuizQuestion({
  question,
  selectedAnswer,
  onSelectAnswer,
}) {
  return (
    <div className="quiz-question">
      <h3>{question.question}</h3>

      <div className="quiz-options">
        {question.options.map((option, index) => (
          <button
            key={index}
            type="button"
            className={`quiz-option ${
              selectedAnswer === index ? "selected" : ""
            }`}
            onClick={() => onSelectAnswer(index)}
          >
            <span className="option-letter">
              {String.fromCharCode(65 + index)}
            </span>

            <span className="option-text">
              {option}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizQuestion;