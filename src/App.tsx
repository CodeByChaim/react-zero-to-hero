import React from 'react';
import AppRouter from './routes/Router';
import Header from './components/Header';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  return (
    <div>
      <Header title={'React Advanced Project - Routing with React Router'} />
      <p>{'client-side routing with react-router-dom'}</p>
      <AppRouter />
      {/*<TodoList />*/}
    </div>
  );
};

export default App;
