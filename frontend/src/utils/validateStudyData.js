function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateStudyData(data) {
  if (!data || typeof data !== "object") {
    return {
      valid: false,
      error: "Study data is missing or invalid.",
    };
  }

  if (!isNonEmptyString(data.topic)) {
    return {
      valid: false,
      error: "Study topic is missing.",
    };
  }

  if (!Array.isArray(data.flashcards)) {
    return {
      valid: false,
      error: "Flashcards data is invalid.",
    };
  }

  if (data.flashcards.length === 0) {
    return {
      valid: false,
      error: "No flashcards were generated.",
    };
  }

  for (let i = 0; i < data.flashcards.length; i++) {
    const card = data.flashcards[i];

    if (!card || typeof card !== "object") {
      return {
        valid: false,
        error: `Flashcard ${i + 1} is invalid.`,
      };
    }

    if (!isNonEmptyString(card.question)) {
      return {
        valid: false,
        error: `Flashcard ${i + 1} has no question.`,
      };
    }

    if (!isNonEmptyString(card.answer)) {
      return {
        valid: false,
        error: `Flashcard ${i + 1} has no answer.`,
      };
    }
  }

  if (!Array.isArray(data.quiz)) {
    return {
      valid: false,
      error: "Quiz data is invalid.",
    };
  }

  if (data.quiz.length === 0) {
    return {
      valid: false,
      error: "No quiz questions were generated.",
    };
  }

  for (let i = 0; i < data.quiz.length; i++) {
    const question = data.quiz[i];

    if (!question || typeof question !== "object") {
      return {
        valid: false,
        error: `Quiz question ${i + 1} is invalid.`,
      };
    }

    if (!isNonEmptyString(question.question)) {
      return {
        valid: false,
        error: `Quiz question ${i + 1} has no question.`,
      };
    }

    if (
      !Array.isArray(question.options) ||
      question.options.length !== 4
    ) {
      return {
        valid: false,
        error: `Quiz question ${i + 1} must have exactly 4 options.`,
      };
    }

    for (const option of question.options) {
      if (!isNonEmptyString(option)) {
        return {
          valid: false,
          error: `Quiz question ${i + 1} has an invalid option.`,
        };
      }
    }

    if (
      !Number.isInteger(question.correctAnswer) ||
      question.correctAnswer < 0 ||
      question.correctAnswer >= question.options.length
    ) {
      return {
        valid: false,
        error: `Quiz question ${i + 1} has an invalid correct answer.`,
      };
    }
  }

  return {
    valid: true,
    error: null,
  };
}