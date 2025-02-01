import React from 'react';
import { Provider } from "react-redux";
import AppRouter from './routes/Router';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import { store } from "./store/store";

const App: React.FC = () => {
  return (
    <div>
      <Header title={'React Advanced Project - Routing with React Router'} />
      <p>{'client-side routing with react-router-dom'}</p>
      <AuthProvider>
        <Provider store={store}>
        <AppRouter />
        </Provider>
      </AuthProvider>
    </div>
  );
};

export default App;
