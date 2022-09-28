import React from 'react';
import ReactDOM from 'react-dom/client';
import Axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Bracket } from './Bracket/Bracket';
import { Login } from './Login/Login';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { UserContextProvider } from './contexts/userContext';

Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/bracket" element={<Bracket />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
