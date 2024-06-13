import React from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import Navbar from "./components/NavBar";
import { BrowserRouter } from "react-router-dom";

function App() {
  // useEffect (() => {
  //   document.title = "Q-Forums"
  // }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
      <h1 className="title">Q-Forums</h1>
      <SearchBar />
    </div>
  );
}

export default App;
