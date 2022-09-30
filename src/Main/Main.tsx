import React from 'react';
import Axios from 'axios';
import { UserContextProvider } from '../contexts/userContext';
import { Router } from '../Router/Router';

export const Main = () => {
  React.useEffect(() => {
    Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
  }, []);

  return (
    <React.StrictMode>
      <UserContextProvider>
        <Router />
      </UserContextProvider>
    </React.StrictMode>
  )
}