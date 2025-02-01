import React from 'react';
import AppRouter from './routes/Router';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <div>
      <Header title={'React Advanced Project - Routing with React Router'} />
      <p>{'client-side routing with react-router-dom'}</p>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
};

export default App;
