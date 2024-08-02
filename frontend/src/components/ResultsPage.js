import React from "react";
import Results from "./Results";
import SearchBar from "./SearchBar";
import "./ResultsSearchBar.css";

const ResultsPage = ({ results, setResults, loading, setLoading }) => {
  return (
    <React.Fragment>
      <div className="results-bar">
        <SearchBar setResults={setResults} setLoading={setLoading} />
      </div>
      <Results results={results} loading={loading} setLoading={setLoading} />
    </React.Fragment>
  );
};

export default ResultsPage;
