import { React, useState } from "react";
import Results from "./Results";
import SearchBar from "./SearchBar";

import "./ResultsSearchBar.css";
import { useState } from "react";

const ResultsPage = ({ results, setResults }) => {
  const [loading, setLoading] = useState(true);
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
