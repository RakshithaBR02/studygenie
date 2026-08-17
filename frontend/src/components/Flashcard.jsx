function Flashcard({ question, answer, isFlipped, onFlip }) {
  return (
    <div
      className={`flashcard ${isFlipped ? "flipped" : ""}`}
      onClick={onFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onFlip();
        }
      }}
    >
      <div className="flashcard-inner">
        <div className="flashcard-face flashcard-front">
          <span className="flashcard-label">QUESTION</span>

          <h3>{question}</h3>

          <span className="flip-hint">
            Click to reveal answer
          </span>
        </div>

        <div className="flashcard-face flashcard-back">
          <span className="flashcard-label">ANSWER</span>

          <p>{answer}</p>

          <span className="flip-hint">
            Click to see question
          </span>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;