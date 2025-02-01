import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div>
      <h1>About</h1>
      <p>This is a simple multi-page React app using React Router.</p>
      <nav>
        <Link to={'/'}>Back to Home</Link>
      </nav>
    </div>
  );
};

export default About;
