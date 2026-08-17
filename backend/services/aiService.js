const { GoogleGenAI } = require("@google/genai");

const {
  validateStudyData,
} = require("../utils/validateStudyData");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const studyDataSchema = {
  type: "object",
  properties: {
    topic: {
      type: "string",
    },
    flashcards: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
          },
          answer: {
            type: "string",
          },
        },
        required: ["question", "answer"],
      },
    },
    quiz: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
          },
          options: {
            type: "array",
            items: {
              type: "string",
            },
          },
          correctAnswer: {
            type: "integer",
          },
        },
        required: ["question", "options", "correctAnswer"],
      },
    },
  },
  required: ["topic", "flashcards", "quiz"],
};

async function generateStudyMaterial(topic) {
  const prompt = `
You are an expert educational content generator.

Create a study set for this topic:

${topic}

Generate useful and accurate learning material.

Requirements:

1. Generate 5 flashcards.
2. Each flashcard must have:
   - question
   - answer

3. Generate 5 multiple-choice quiz questions.
4. Each quiz question must have exactly 4 options.
5. Only one option must be correct.
6. correctAnswer must be the zero-based index of the correct option.
7. Questions should test understanding of important concepts.
8. Avoid duplicate or ambiguous questions.
9. Keep answers clear and suitable for a student.
10. Return ONLY the requested JSON structure.
11. Do not return Markdown.
12. Do not include explanations outside the JSON.

The response must follow the provided JSON schema exactly.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: studyDataSchema,
    },
  });

  if (!response || !response.text) {
    throw new Error("Gemini returned an empty response.");
  }

  let studyData;

try {
  studyData = JSON.parse(response.text);
} catch (error) {
  throw new Error("Gemini returned invalid JSON.");
}

const validationResult = validateStudyData(studyData);

if (!validationResult.valid) {
  throw new Error(
    `Invalid study data: ${validationResult.error}`
  );
}

return studyData;
}

module.exports = {
  generateStudyMaterial,
};