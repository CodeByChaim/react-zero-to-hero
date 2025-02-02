import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import TodoList from '../components/TodoList';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to={'/profile/chaim'}>My Profile</Link>
      </nav>
      <TodoList />
      <button
        onClick={() => {
          dispatch(logout());
          navigate('/');
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
