import React, { useState } from "react";
import axios from "axios";
import "./WordCounter.css"; // Import custom CSS

function WordCounter() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading spinner
    setResult(null); // Clear previous results
    try {
      const response = await axios.post(
        "http://localhost:8080/api/word-counter/count",
        text,
        {
          headers: { "Content-Type": "text/plain" },
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error("Error submitting text", error);
    }
    setLoading(false); // Stop loading spinner
  };

  const handleClear = () => {
    setText(""); // Clear the input
    setResult(null); // Clear the results
  };

  return (
    <div className="container">
      <h1>Word Counter</h1>
      <form onSubmit={handleSubmit} className="word-counter-form">
        <textarea
          rows="10"
          cols="50"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter your text here..."
        />
        <div className="buttons">
          <button type="submit" disabled={!text}>
            Count Words
          </button>
          <button type="button" onClick={handleClear} disabled={!text}>
            Clear
          </button>
        </div>
      </form>
      {loading && <div className="spinner">Processing...</div>}{" "}
      {/* Loading spinner */}
      {result && (
        <div className="results">
          <h2>Results:</h2>
          <div className="result-card">
            <p>
              <strong>Word Count:</strong> {result.wordCount}
            </p>
            <p>
              <strong>Character Count:</strong> {result.charCount}
            </p>
            <p>
              <strong>Paragraph Count:</strong> {result.paragraphCount}
            </p>
          </div>
        </div>
      )}
      {text && (
        <div className="live-count">
          <p>Live Word Count: {text.trim().split(/\s+/).length}</p>
          <p>
            Live Character Count (excluding spaces):{" "}
            {text.replace(/\s+/g, "").length}
          </p>
        </div>
      )}
    </div>
  );
}

export default WordCounter;
