import { useState } from "react";
import Flashcard from "./Flashcard";

function FlashcardContainer({ flashcards, onStartQuiz }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Safety check: prevent the component from crashing
  // if no flashcards are available.
  if (!flashcards || flashcards.length === 0) {
    return (
      <section className="study-preview">
        <h2>No flashcards available</h2>

        <p>
          No flashcards were generated for this study set.
        </p>
      </section>
    );
  }

  const totalCards = flashcards.length;
  const currentCard = flashcards[currentIndex];

  const goToPrevious = () => {
    if (currentIndex === 0) {
      return;
    }

    setCurrentIndex((previousIndex) => previousIndex - 1);
    setIsFlipped(false);
  };

  const goToNext = () => {
    if (currentIndex === totalCards - 1) {
      return;
    }

    setCurrentIndex((previousIndex) => previousIndex + 1);
    setIsFlipped(false);
  };

  const progress =
    ((currentIndex + 1) / totalCards) * 100;

  return (
    <section className="flashcard-section">
      <div className="section-heading">
        <div>
          <span className="section-label">
            FLASHCARDS
          </span>

          <h2>Review the key concepts</h2>
        </div>

        <span className="card-counter">
          Card {currentIndex + 1} / {totalCards}
        </span>
      </div>

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Flashcard
        question={currentCard.question}
        answer={currentCard.answer}
        isFlipped={isFlipped}
        onFlip={() =>
          setIsFlipped((previous) => !previous)
        }
      />

      <div className="flashcard-controls">
        <button
          type="button"
          className="secondary-button"
          onClick={goToPrevious}
          disabled={currentIndex === 0}
        >
          ← Previous
        </button>

        <button
          type="button"
          className="primary-button"
          onClick={() =>
            setIsFlipped((previous) => !previous)
          }
        >
          {isFlipped
            ? "Show Question"
            : "Flip Card"}
        </button>

        <button
          type="button"
          className="secondary-button"
          onClick={goToNext}
          disabled={currentIndex === totalCards - 1}
        >
          Next →
        </button>
      </div>

      <div className="quiz-start">
        <p>
          Finished reviewing the flashcards?
        </p>

        <button
          type="button"
          className="primary-button"
          onClick={onStartQuiz}
        >
          Start Quiz
        </button>
      </div>
    </section>
  );
}

export default FlashcardContainer;