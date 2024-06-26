import React from "react";

import "./Results.css";

const Results = ({ results }) => {
  return (
    
    <div className="results">
      {results.map((result, id) => {
        return <div key={id}>{result.name}</div>;
      })}
    </div>
  );
};

export default Results;
