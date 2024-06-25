import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/fontawesome-free-solid";
import { Link } from "react-router-dom";

import "./SearchBar.css";

const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const handleSubmit = () => {
    handleChange(input);
  };

  return (
    <div className="wrap">
      <form className="search">
        <input
          type="text"
          className="searchTerm"
          placeholder="What are you looking for?"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
        <Link to="/results">
          <button type="submit" className="searchButton" onClick={handleSubmit}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </Link>
      </form>
    </div>
  );
};

export default SearchBar;
