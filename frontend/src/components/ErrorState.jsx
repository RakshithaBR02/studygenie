function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state">
      <div className="error-icon">!</div>

      <h2>Something went wrong</h2>

      <p>{message}</p>

      <button
        type="button"
        className="primary-button"
        onClick={onRetry}
      >
        Try Again
      </button>
    </div>
  );
}

export default ErrorState;