/*import React from 'react';

const About = () => {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is our about page.</p>
    </div>
  );
};

export default About;
*/
import React from 'react';

const About = () => {
  const aboutStyle = {
    backgroundColor: '#020f2fe3', // dark blue
    color: 'white',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  };

  return (
    <div style={aboutStyle}>
      <h1>What is Q-Forums?</h1>
      <p>Q-Forums is a centralized vulnerability repository/search engine 
        made by Adam Pollak, Samriddhi Kumar, Arpan Das, Trisha Nittala, and Adam Brook. </p>
        <p>Head over to the home page and search for the problem on your computer, we'll have an answer for you! </p>
    </div>
  );
};

export default About;
