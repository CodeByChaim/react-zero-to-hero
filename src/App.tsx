import React from 'react';
import AppRouter from './routes/Router';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
// import TodoList from './components/TodoList';

const App: React.FC = () => {
  return (
    <div>
      <Header title={'React Advanced Project - Routing with React Router'} />
      <p>{'client-side routing with react-router-dom'}</p>
      <AuthProvider>
        <AppRouter />
        {/*<TodoList />*/}
      </AuthProvider>
    </div>
  );
};

export default App;
