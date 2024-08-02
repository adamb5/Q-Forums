import React, { useState, useEffect } from "react";
import "./Results.css";

const Results = ({ results }) => {
  //const [results, setResults] = useState(initialResults || []);
  const [visibleResults, setVisibleResults] = useState(25);
  const [sortBy, setSortBy] = useState("date");
  const [selectedType, setSelectedType] = useState("all");
  const [expandedTitles, setExpandedTitles] = useState({});
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const ws = new WebSocket("ws://q-forums.com");

  //   ws.onmessage = (event) => {
  //     const newResult = JSON.parse(event.data);
  //     setResults((prevResults) => {
  //       const updatedResults = [...prevResults, newResult];
  //       // Check if updatedResults have elements to set loading to false
  //       if (updatedResults.length > 0) {
  //         setLoading(false);
  //       }
  //       return updatedResults;
  //     });
  //   };

  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  useEffect(() => {
    if (results.length > 0) {
      setLoading(false);
      if (sortBy === "date") {
        setSelectedType("all");
        sortByDate();
      } else if (sortBy === "type") {
        sortByType();
      }
    } else {
      setLoading(true);
    }
  }, [results, sortBy]);

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
  };

  const sortByDate = () => {
    results.sort(
      (a, b) => new Date(b.creation_date) - new Date(a.creation_date)
    );
  };

  const sortByType = () => {
    const rank = {
      vulnerability: 1,
      bug: 2,
      question: 3,
    };

    results.sort((a, b) => (rank[a.label] || 4) - (rank[b.label] || 4));
  };

  const getLabelClass = (label) => {
    switch (label) {
      case "question":
        return "label-box label-question";
      case "vulnerability":
        return "label-box label-vulnerability";
      case "bug":
        return "label-box label-bug";
      default:
        return "label-box";
    }
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleReadMoreClick = (question_id) => {
    setExpandedTitles((prev) => ({
      ...prev,
      [question_id]: !prev[question_id],
    }));
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength);
  };

  const filteredResults =
    selectedType === "all"
      ? results
      : results.filter((result) => result.label === selectedType);

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
            className={sortBy === "type" ? "button active" : "button"}
            onClick={() => handleSort("type")}
          >
            Type
          </button>
          {sortBy === "type" && (
            <select
              className="type-dropdown"
              value={selectedType}
              onChange={handleTypeChange}
            >
              <option value="all">All</option>
              <option value="vulnerability">Vulnerability</option>
              <option value="question">Question</option>
              <option value="bug">Bug</option>
            </select>
          )}
        </div>
      </div>
      <div className="results">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          filteredResults.slice(0, visibleResults).map((result) => {
            const domain = getDomain(result.link);
            const isExpanded = expandedTitles[result.question_id];
            const displayedTitle = isExpanded
              ? result.title
              : truncateText(result.title, 100);
            return (
              <a
                key={result.question_id}
                href={result.link || "#"}
                target={result.link ? "_blank" : "self"}
                rel={result.link ? "noreferrer" : ""}
                className="result-item-link"
              >
                <div className="result-item">
                  <div className="result-title">
                    <span className={getLabelClass(result.label)}>
                      {result.label}
                    </span>
                    {displayedTitle}
                    {result.title.length > 100 && (
                      <span
                        className="read-more"
                        onClick={(e) => {
                          e.preventDefault();
                          handleReadMoreClick(result.question_id);
                        }}
                      >
                        {isExpanded ? " Show Less" : " ...Read More"}
                      </span>
                    )}
                    {result.suspicious === 1 && (
                      <span style={{ color: "red", marginLeft: "5px" }}>
                        {" "}
                        🚩{" "}
                      </span>
                    )}
                  </div>
                  <div className="result-domain">
                    {domain ? `Source: ${domain}` : "No source available"}
                  </div>
                  {/* <div>{result.body}</div> */}
                </div>
              </a>
            );
          })
        )}
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
