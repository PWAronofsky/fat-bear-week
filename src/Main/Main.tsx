import React from 'react';
import Axios from 'axios';
import { UserContextProvider } from '../contexts/userContext';
import { Router } from '../Router/Router';

export const Main = () => {
  Axios.defaults.baseURL = process.env.REACT_APP_LOCAL_API;

  return (
    <React.StrictMode>
      <UserContextProvider>
        <Router />
      </UserContextProvider>
    </React.StrictMode>
  )
}