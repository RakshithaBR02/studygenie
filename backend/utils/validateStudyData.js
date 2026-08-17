function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validateStudyData(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return {
      valid: false,
      error: "AI response must be a valid object.",
    };
  }

  if (!isNonEmptyString(data.topic)) {
    return {
      valid: false,
      error: "AI response is missing a valid topic.",
    };
  }

  if (!Array.isArray(data.flashcards)) {
    return {
      valid: false,
      error: "Flashcards must be an array.",
    };
  }

  if (data.flashcards.length === 0) {
    return {
      valid: false,
      error: "At least one flashcard is required.",
    };
  }

  for (let i = 0; i < data.flashcards.length; i++) {
    const flashcard = data.flashcards[i];

    if (!flashcard || typeof flashcard !== "object") {
      return {
        valid: false,
        error: `Flashcard ${i + 1} is invalid.`,
      };
    }

    if (!isNonEmptyString(flashcard.question)) {
      return {
        valid: false,
        error: `Flashcard ${i + 1} is missing a question.`,
      };
    }

    if (!isNonEmptyString(flashcard.answer)) {
      return {
        valid: false,
        error: `Flashcard ${i + 1} is missing an answer.`,
      };
    }
  }

  if (!Array.isArray(data.quiz)) {
    return {
      valid: false,
      error: "Quiz must be an array.",
    };
  }

  if (data.quiz.length === 0) {
    return {
      valid: false,
      error: "At least one quiz question is required.",
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
        error: `Quiz question ${i + 1} is missing a question.`,
      };
    }

    if (!Array.isArray(question.options)) {
      return {
        valid: false,
        error: `Quiz question ${i + 1} options must be an array.`,
      };
    }

    if (question.options.length !== 4) {
      return {
        valid: false,
        error: `Quiz question ${i + 1} must have exactly 4 options.`,
      };
    }

    for (let j = 0; j < question.options.length; j++) {
      if (!isNonEmptyString(question.options[j])) {
        return {
          valid: false,
          error: `Quiz question ${i + 1} contains an invalid option.`,
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
        error: `Quiz question ${i + 1} has an invalid correct answer index.`,
      };
    }
  }

  return {
    valid: true,
    error: null,
  };
}

module.exports = {
  validateStudyData,
};