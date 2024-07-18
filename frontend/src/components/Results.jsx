import React, { useState } from "react";

import "./Results.css";

const Results = ({ results }) => {
  const [visibleResults, setVisibleResults] = useState(25);

  const showMoreResults = () => {
    setVisibleResults((prevVisibleResults) => prevVisibleResults + 25);
  };

  return (
    <div className="results">
      {results.slice(0, visibleResults).map((result) => (
        <a
          key={result.question_id}
          href={result.link}
          target="_blank"
          rel="noreferrer"
          className="result-item-link"
        >
          <div className="result-item">
            <div className="result-title">{result.title}</div>
            <div className="result-link">{result.link}</div>
            {/* <div>{result.body}</div> */}
          </div>
        </a>
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
