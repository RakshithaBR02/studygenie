function InputSection({
  topic,
  setTopic,
  onGenerate,
  disabled,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!disabled) {
      onGenerate();
    }
  };

  return (
    <form className="input-section" onSubmit={handleSubmit}>
      <label htmlFor="topic">
        What do you want to study?
      </label>

      <div className="input-row">
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={(event) =>
            setTopic(event.target.value)
          }
          placeholder="e.g. Java OOP, DBMS, Machine Learning..."
          maxLength={200}
          disabled={disabled}
        />

        <button
          type="submit"
          className="primary-button"
          disabled={disabled}
        >
          {disabled
            ? "Generating..."
            : "Generate Study Set"}
        </button>
      </div>

      <div className="input-footer">
        <span>
          Enter any topic you'd like to learn.
        </span>
      </div>
    </form>
  );
}

export default InputSection;