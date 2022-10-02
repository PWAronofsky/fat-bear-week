import React from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/userContext';

export const Header = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [fetchingData, setFetchingData] = React.useState(false);

  const navigate = useNavigate();
  const { isLoggedIn, updateUser, logout } = useUserContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFetchingData(true);
    let isCanceled = false;
    try {
      await Axios.post("/login", { username, password }).then((response) => {
        if(!isCanceled) {
          updateUser({
            username: response.data.username,
            token: response.data.token
          });

          setUsername('');
          setPassword('');

          navigate("/bracket");
        }
      });
      console.log("User was successfully logged in.");
    } catch (e: any) {
      setFetchingData(false);
    }
    
    return () => {
      isCanceled = true;
    }
  }

  return (
    <header className="header-bar">
      <div className="header-container">
        <h4 className="font-weight-normal header-section">
            <div className="row">
              <a href="/" aria-label="home">
                <img className="header-icon" src={require("../images/bear-2-48.png")} alt=""/>
              </a>
              {isLoggedIn && (
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
        <div className="header-section">
          <form onSubmit={handleSubmit}>
            <div className="row align-items-end">
              {!isLoggedIn && (
                <>
                  <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
                    <input onChange={e => setUsername(e.target.value)} name="username" className="form-control form-control-sm input-dark" type="text" placeholder="Username" autoComplete="off" />
                  </div>
                  <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
                    <input onChange={e => setPassword(e.target.value)} name="password" className="form-control form-control-sm input-dark" type="password" placeholder="Password" />
                  </div>
                  <div className="col-md-auto">
                    <button className="btn btn-success btn-sm" disabled={fetchingData}>Log In</button>
                  </div>
                </>
              )}
              </div>
          </form>

          {isLoggedIn && (
            <div className="col-md-auto">
              <button onClick={logout} className="btn btn-success btn-sm">Log Out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}