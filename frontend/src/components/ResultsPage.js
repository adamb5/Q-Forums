import React from "react";
import Results from "./Results";
import SearchBar from "./SearchBar";

import "./ResultsSearchBar.css";

const ResultsPage = ({ results, setResults }) => {
  return (
    <React.Fragment>
      <div className="results-bar">
        <SearchBar setResults={setResults} />
      </div>
      <Results results={results} />
    </React.Fragment>
  );
};

export default ResultsPage;
