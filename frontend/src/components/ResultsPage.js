import React, { useState } from "react";
import Results from "./Results";
import SearchBar from "./SearchBar";

const ResultsPage = ({ results, setResults }) => {
  return (
    <React.Fragment>
      <SearchBar setResults={setResults} />
      <Results results={results} />
    </React.Fragment>
  );
};

export default ResultsPage;
