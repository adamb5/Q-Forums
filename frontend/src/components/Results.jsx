import React, { useState } from "react";

import "./Results.css";

const Results = ({ results }) => {
  const [visibleResults, setVisibleResults] = useState(25);

  const showMoreResults = () => {
    setVisibleResults((prevVisibleResults) => prevVisibleResults + 25);
  };

  const getDomain = (url) => {
    try {
      const domain = new URL(url).hostname.replace("www.", "");
      return domain;
    } catch (e) {
      return null;
    }
  };

  return (
    <div className="results">
      {results.slice(0, visibleResults).map((result) => {
        const domain = getDomain(result.link);
        return (
          <a
            key={result.question_id}
            href={result.link || "#"}
            target={result.link ? "_blank" : "self"}
            rel={result.link ? "noreferrer" : ""}
            className="result-item-link"
          >
            <div className="result-item">
              <div className="result-title">{result.title}</div>
              <div className="result-domain">
                {domain ? `Source: ${domain}` : "No source available"}
              </div>
              {/* <div>{result.body}</div> */}
            </div>
          </a>
        );
      })}
      {visibleResults < results.length && (
        <div className="show-more">
          <button onClick={showMoreResults}>Show More</button>
        </div>
      )}
    </div>
  );
};

export default Results;
