import React from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  return (
    <div>
      <Header title={'React Advanced Project - State Management'} />
      <p>{'Manage component state using React hooks (useState, useEffect)'}</p>
      <TodoList />
    </div>
  );
};

export default App;
