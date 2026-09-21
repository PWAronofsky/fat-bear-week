import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserContext } from '../contexts/userContext';

export const Header = React.forwardRef ((_, ref) => {
  const { loginWithRedirect } = useAuth0();
  const { isLoggedIn, logout } = useUserContext();

  const login = () => loginWithRedirect();
  const signup = () => loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } });

  return (
    <header className="header-bar" ref={ref as React.RefObject<HTMLElement>}>
      <div className="header-container">
        <h4 className="font-weight-normal header-section">
            <div className="row no-wrap">
              <Link to="/" aria-label="home">
                <img className="header-icon" src={require("../images/bear-2-48.png")} alt=""/>
              </Link>
              {isLoggedIn && (
                <>
                  <Link to="/bracket" className="nav-link text-white">
                    Bracket
                  </Link>
                  <Link to="/standings" className="nav-link text-white">
                    Standings
                  </Link>
                </>
              )}
              <Link to="/about" className="nav-link text-white">
                About
              </Link>
            </div>
        </h4>
        <div className="header-section no-wrap">
          <div className="row align-items-end no-wrap">
            {isLoggedIn && (
              <div className="col-md-auto">
                <button onClick={logout} className="btn btn-success btn-sm">Log Out</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
})