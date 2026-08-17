function Results({
  totalQuestions,
  correctCount,
  wrongCount,
  notAttemptedCount,
  onRetryWrong,
  hasWrongAnswers,
}) {
  const percentage =
    totalQuestions > 0
      ? Math.round((correctCount / totalQuestions) * 100)
      : 0;

  return (
    <section className="results-section">
      <div className="results-header">
        <span className="section-label">RESULTS</span>

        <h2>Quiz Completed!</h2>

        <div className="score">
          <span className="score-number">
            {correctCount} / {totalQuestions}
          </span>

          <span className="score-percentage">
            {percentage}%
          </span>
        </div>
      </div>

      <div className="result-stats">
        <div className="result-stat correct-stat">
          <span className="stat-number">{correctCount}</span>
          <span className="stat-label">Correct</span>
        </div>

        <div className="result-stat wrong-stat">
          <span className="stat-number">{wrongCount}</span>
          <span className="stat-label">Wrong</span>
        </div>

        <div className="result-stat unanswered-stat">
          <span className="stat-number">
            {notAttemptedCount}
          </span>
          <span className="stat-label">
            Not Attempted
          </span>
        </div>
      </div>

      {hasWrongAnswers && (
        <button
          type="button"
          className="primary-button retry-wrong-button"
          onClick={onRetryWrong}
        >
          Retry Wrong Answers
        </button>
      )}

      {!hasWrongAnswers && (
        <p className="perfect-message">
          Great job! You got every attempted question correct.
        </p>
      )}
    </section>
  );
}

export default Results;