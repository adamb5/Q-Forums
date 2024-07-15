
import React, { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import About from "./components/About";
import Contact from "./components/Contact";
import SearchBar from "./components/SearchBar";
// import Results from "./components/Results";
import ResultsPage from "./components/ResultsPage";
import "./App.css";
function App() {
 const [results, setResults] = useState([]);


 return (
   <React.Fragment>
     <BrowserRouter>
       <NavBar />
       <Routes>
         <Route path="/about" element={<About />} />
         <Route path="/contact" element={<Contact />} />
         <Route path="/results" element={<ResultsPage results={results} setResults={setResults}/>} />
         <Route
           path="/"
           element={
             <div className="App">
               <h1 className="title">Q-Forums</h1>
               <SearchBar setResults={setResults} />
               {/* <Results results={results} /> */}
             </div>
           }
         />


         {/* Add other routes here as needed */}
       </Routes>
     </BrowserRouter>
   </React.Fragment>
 );
}


export default App;





