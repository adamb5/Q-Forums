/*import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
*/

import React, { useState } from "react";
import "./Home.css";
import SearchBar from "./SearchBar"; // Make sure the path is correct
import Results from "./Results";

const Home = () => {
  const [results, setResults] = useState([]);

  return (
    <React.Fragment>
      <div className="home-container">
        <h1 className="home-title">Q-Forums</h1>
        <SearchBar setResults={setResults} />
      </div>
      <Results results={results} />
    </React.Fragment>
  );
};

export default Home;
