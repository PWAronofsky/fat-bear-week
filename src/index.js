import ReactDOM from 'react-dom/client';
import { Main } from './Main/Main';

import { Auth0Provider } from '@auth0/auth0-react';

import './index.css';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <Auth0Provider
    domain="dev-c15du7wevqtpe3bb.us.auth0.com"
    clientId="IuNyIBoywUPQ5TwJb7WgUkPAZjSd3P2k"
    authorizationParams={{
      redirect_uri: "http://localhost:3000/bracket"
    }}
  >
    <Main />
  </Auth0Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
