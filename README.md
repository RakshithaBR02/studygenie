# StudyGenie

StudyGenie is an AI-powered Study Assistant built using React, Node.js, Express, and Google's Gemini API.

It allows users to enter any study topic and automatically generates structured flashcards and an interactive multiple-choice quiz.

The application is designed as a learning tool rather than a chatbot. AI-generated content is converted into interactive UI components such as flashcards, quizzes, and results.

---

## Features

- Enter any free-form study topic
- AI-generated flashcards
- Interactive flashcard flip
- Previous and next flashcard navigation
- Flashcard progress indicator
- AI-generated multiple-choice quiz
- Select quiz answers
- Skip questions
- Previous and next quiz navigation
- Change answers before submission
- Quiz score and percentage
- Correct, wrong, and not-attempted results
- Retry only incorrectly answered questions
- Retry results remain based on the original quiz size
- Loading state
- Error handling
- Retry after API failure
- Frontend response validation
- Backend response validation
- Stale-request protection
- Responsive design for desktop, tablet, and mobile

---

## Technology Stack

### Frontend

- React
- Vite
- JavaScript
- CSS
- React Hooks

### Backend

- Node.js
- Express
- JavaScript

### AI

- Google Gemini API
- `@google/genai`

The Gemini API is called from the backend.

The Gemini API key is never exposed to the React frontend.

---

## Architecture

The application follows this workflow:

```text
User enters topic
        |
        v
React Frontend
        |
        | POST /api/generate
        v
Node.js + Express Backend
        |
        v
Google Gemini API
        |
        v
Structured JSON Response
        |
        v
Backend Validation
        |
        v
Frontend Validation
        |
        v
Interactive Study Material
        |
        +------> Flashcards
        |
        +------> Quiz
                    |
                    +----> Results
                    |
                    +----> Retry Wrong Answers