import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TodoList from "../components/TodoList";

const Dashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to={'/profile/chaim'}>My Profile</Link>
      </nav>
      <TodoList/>
      <button onClick={() => {
        logout();
        navigate('/');
      }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
