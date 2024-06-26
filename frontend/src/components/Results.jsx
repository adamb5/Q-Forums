import React from "react";

import "./Results.css";

const Results = ({ results }) => {
  return (
    
    <div className="results">
      {results.map((result) => {
        return <div key={results.id}>{result.title} {result.link}</div>;
      })}
    </div>
  );
};

export default Results;
