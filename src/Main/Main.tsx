import React from 'react';
import Axios from 'axios';
import { Auth0Provider } from '@auth0/auth0-react';
import { UserContextProvider } from '../contexts/userContext';
import { Router } from '../Router/Router';

export const Main = () => {
  Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

  return (
    <React.StrictMode>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID as string}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: 'https://fatbearweek-api'
        }}
      >
        <UserContextProvider>
          <Router />
        </UserContextProvider>
      </Auth0Provider>
    </React.StrictMode>
  )
}