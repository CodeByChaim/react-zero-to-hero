import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the React Advanced Project.</p>
      <nav
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link to={'/about'}>About</Link>
        <Link to={'/login'}>Login</Link>
        <Link to={'/dashboard'}>Dashboard</Link>
        <Link to={'/profile'}>Profile</Link>
      </nav>
    </div>
  );
};

export default Home;
