import React, { useState } from "react";

import "./Results.css";

const Results = ({ results }) => {
  const [visibleResults, setVisibleResults] = useState(25);

  const [sortBy, setSortBy] = useState("date");

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

  const handleSort = (criteria) => {
    setSortBy(criteria);

    if (criteria === "date") {
      sortByDate();
    } else if (criteria === "views") {
      sortByViews();
    }
  };

  const sortByDate = () => {
    results.sort(
      (a, b) => new Date(b.creation_date) - new Date(a.creation_date)
    );
  };

  const sortByViews = () => {
    results.sort((a, b) => b.view_count - a.view_count);
  };

  return (
    <React.Fragment>
      <div className="buttonContainerWrapper">
        <div className="buttonContainer">
          <button
            className={sortBy === "date" ? "button active" : "button"}
            onClick={() => handleSort("date")}
          >
            Date
          </button>
          <button
            className={sortBy === "views" ? "button active" : "button"}
            onClick={() => handleSort("views")}
          >
            Views
          </button>
        </div>
      </div>
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
                <div className="result-title">{result.title} 
                  {result.suspicious === 1 && <span style={{color:"red", marginLeft:"5px"}}> 🚩 </span>}
                </div>
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
    </React.Fragment>
  );
};

export default Results;
