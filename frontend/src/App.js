/*import React from "react";
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
*/


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import About from './components/About';
import Home from './components/Home';
import Contact from './components/Contact';


function App() {
 return (
   <Router>
     <NavBar />
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/about" element={<About/>} />
       <Route path="/contact" element={<Contact/>} />

       {/* Add other routes here as needed */}
     </Routes>
   </Router>
 );
}


export default App;



