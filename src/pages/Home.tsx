import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the React Advanced Project.</p>
      <nav>
        <Link to={'/about'}>Go to About</Link>
      </nav>
    </div>
  );
};

export default Home;
