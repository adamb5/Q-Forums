import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/fontawesome-free-solid";
import { Link } from "react-router-dom";

import "./SearchBar.css";

// function searchHandler(value){
//   // event.preventDefault();
//   console.log("made it to event handler");
//        fetch(`http://localhost:5000/stack/getans/${value}`)
//       .then((response) => response.json())
//       .then((json) => {
//         const results = JSON.parse(json);
//         setResults(results);
//       });
//  };

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

  function searchHandler(value){
    // event.preventDefault();
    console.log("made it to event handler");
         fetch(`http://localhost:5000/stack/getans/${value}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.items);
          const results = data.items
          setResults(results);
        });
   };

  const handleChange = (value) => {
    setInput(value);
    // searchHandler(value);
  };

  const handleSubmit = () => {
    handleChange(input);
    searchHandler(input);
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
