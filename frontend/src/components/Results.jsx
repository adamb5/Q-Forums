<<<<<<< HEAD
import React from "react";
=======
import React, { useState } from "react";

>>>>>>> e1819a8b7965527be1d04ae37275df3b8a24bcb8
import "./Results.css";

const Results = ({ results }) => {
  const [visibleResults, setVisibleResults] = useState(25);

  const showMoreResults = () => {
    setVisibleResults((prevVisibleResults) => prevVisibleResults + 25);
  };

  return (
    <div className="results">
      {results.slice(0, visibleResults).map((result) => (
        <div key={result.question_id} className="result-item">
          <div className="result-title">{result.title}</div>
          <a
            href={result.link}
            target="_blank"
            rel="noreferrer"
            className="result-link"
          >
            {result.link}
          </a>
        </div>
      ))}
      {visibleResults < results.length && (
        <div className="show-more">
          <button onClick={showMoreResults}>Show More</button>
        </div>
      )}
    </div>
  );
};

export default Results;



