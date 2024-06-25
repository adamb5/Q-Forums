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

import React from 'react';
import './Home.css';
import SearchBar from './SearchBar'; // Make sure the path is correct

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Q-Forums</h1>
      <SearchBar />
    </div>
  );
};

export default Home;

