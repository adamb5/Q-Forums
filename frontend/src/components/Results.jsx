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
          {/* <div>{result.body}</div> */}
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



