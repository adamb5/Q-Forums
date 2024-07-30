import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/fontawesome-free-solid";
import { Link } from "react-router-dom";
//import axios from "axios";

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

  // const fetchData = (value) => {
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then((response) => response.json())
  //     .then((json) => {
  //       const results = json.filter((user) => {
  //         return (
  //           value &&
  //           user &&
  //           user.name &&
  //           user.name.toLowerCase().includes(value)
  //         );
  //       });
  //       setResults(results);
  //     });
  // };

  //const [value, setValue] = useState("");
  const searchHandler = async (value) => {
    //event.preventDefault();
    console.log("made it to event handler");
    const response = await fetch(`http://q-forums.com/api/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tagged: value }),
    });

    await fetch(`http://q-forums.com/data`)
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((data) => {
          return value && data.tagged.includes(value);
        });
        results.sort(
          (a, b) => new Date(b.creation_date) - new Date(a.creation_date)
        );
        console.log(Object.keys(results).length);
        setResults(results);
        /*
          const current_time = Math.floor(new Date().getTime()/1000); //seconds
          const dateOneYear = current_time - 31536000;
          console.log("cur time" + " " + current_time);
          console.log("one ear time" + " " + dateOneYear);
          */
      });

    //const data = await response.json();
    //console.log(data.items);
    //setResults(data.items);

    /*fetch(`http://localhost:5000/search`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.items);
        const results = data.items;
        setResults(results);
      });*/
    //const response = await axios.post('http://localhost:5000/search', {value})
    //console.log(response.data);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setInput(event.target.value);
    //searchHandler(event.target.value);
  };

  const handleSubmit = () => {
    //event.preventDefault();
    if (input !== "") {
      //handleChange();
      searchHandler(input);
    }
  };

  return (
    <div className="wrap">
      <form className="search">
        <input
          type="text"
          method="POST"
          className="searchTerm"
          placeholder="What are you looking for?"
          value={input}
          onChange={handleChange}
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
