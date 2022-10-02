import React from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/userContext';

export const Header = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [fetchingData, setFetchingData] = React.useState(false);

  const navigate = useNavigate();
  const { isLoggedIn, updateUser } = useUserContext();

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
              <img className="header-icon" src={require("../images/bear-2-48.png")} alt=""/>
              {isLoggedIn && (
                <>
                  <a href="/bracket" className="nav-link text-white">
                    Bracket
                  </a>
                  {/* <a href="/bracket" className="nav-link text-white">
                    Scores
                  </a>
                  <a href="/bracket" className="nav-link text-white">
                    About
                  </a> */}
                </>
              )}
            </div>
        </h4>
        <form onSubmit={handleSubmit} className="header-section">
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
      </div>
    </header>
  )
}