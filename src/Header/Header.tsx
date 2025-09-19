import React from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/userContext';

export const Header = React.forwardRef ((_, ref) => {

  const navigate = useNavigate();
  const { isAuthenticated, logout } = useUserContext();


  return (
    <header className="header-bar" ref={ref as React.RefObject<HTMLElement>}>
      <div className="header-container">
        <h4 className="font-weight-normal header-section">
            <div className="row no-wrap">
              <a href="/" aria-label="home">
                <img className="header-icon" src={require("../images/bear-2-48.png")} alt=""/>
              </a>
              {isAuthenticated && (
                <>
                  <a href="/bracket" className="nav-link text-white">
                    Bracket
                  </a>
                  <a href="/standings" className="nav-link text-white">
                    Standings
                  </a>
                </>
              )}
              <a href="/about" className="nav-link text-white">
                About
              </a>
            </div>
        </h4>
        <div className="header-section no-wrap">

          {isAuthenticated && (
            <div className="col-md-auto">
              <button onClick={logout} className="btn btn-success btn-sm">Log Out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
})