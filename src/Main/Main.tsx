import React from 'react';
import Axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Bracket } from '../Bracket/Bracket';
import { UserContextProvider } from '../contexts/userContext';
import { Login } from '../Login/Login';

export const Main = () => {
  React.useEffect(() => {
    Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
  }, []);
  
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/bracket" element={<Bracket />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  )
}