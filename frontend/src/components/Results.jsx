import React from "react";

import "./Results.css";

const Results = ({ results }) => {
  return (
    <div className="results">
      {results.map((result) => (
        <div key={result.id} className="result-item">
          <div className="result-title">{result.title}</div>
          <a href={result.link} target="_blank" rel="noreferrer" className="result-link">
            {result.link}
          </a>
        </div>
      ))}
    </div>
  );
};

export default Results;
