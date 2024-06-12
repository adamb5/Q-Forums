import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/fontawesome-free-solid'

import "./SearchBar.css";

const SearchBar = (props) => {
  return (
    <div className="wrap">
      <form className="search">
        <input type="text" className="searchTerm" placeholder="What are you looking for?"/>
        <button type="submit" className="searchButton">
            <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
