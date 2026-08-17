# StudyGenie

StudyGenie is an AI-powered study assistant built with React and Node.js. It allows users to enter any study topic and automatically generates structured flashcards and an interactive multiple-choice quiz using an LLM.

## Features

- Enter any free-form study topic
- AI-generated flashcards
- Interactive flashcard flip functionality
- Previous and next flashcard navigation
- Flashcard progress indicator
- AI-generated multiple-choice quiz
- Select, skip, and change quiz answers
- Previous and next quiz navigation
- Quiz score and percentage
- Correct, wrong, and not-attempted results
- Retry only incorrectly answered questions
- Retry results remain based on the original quiz size
- Loading state while generating content
- Error handling and retry functionality
- Frontend and backend response validation
- Protection against stale API requests
- Responsive design for desktop, tablet, and mobile
- API key stored securely on the backend

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

The Gemini API is called only from the backend. The API key is never exposed to the React frontend.

## Application Architecture

The application follows this flow:

```text
User
  |
  v
React Frontend
  |
  | POST /api/generate
  v
Node.js + Express Backend
  |
  v
Gemini API
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
  +--> Flashcards
  |
  +--> Quiz
        |
        +--> Results
        |
        +--> Retry Wrong Answers