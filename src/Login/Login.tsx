import React from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/userContext';

export const Login = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [leagueId, setLeagueId] = React.useState('');
  const [showSignup, setShowSignup] = React.useState(true);

  const navigate = useNavigate();
  const { updateUser } = useUserContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if(showSignup) {
        await Axios.post("/register", { username, email, password, leagueId }).then((response) => {
          updateUser({
            username: response.data.username,
            token: response.data.token
          });
  
          navigate("/bracket");
        });
        console.log("User was successfully created.");
      } else {
        await Axios.post("/login", { username, password }).then((response) => {
          updateUser({
            username: response.data.username,
            token: response.data.token
          });
  
          navigate("/bracket");
        });
        console.log("User was successfully logged in.");
      }
    } catch (e) {
      console.log(e)
    }
  }

  const toggleShowSignup = () => {
    setShowSignup(!showSignup);
  }

  return (
    <div className="page-container">
      <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-7 py-3 py-md-5">
          <h1 className="display-3">Fat Bear Week!</h1>
          <p className="lead text-muted">It's that time again, mama bears and brave cubs! The showdown of the year! Fill out your brackets, and may the chunkiest bear win!</p>
          <button onClick={toggleShowSignup} className="btn btn-md btn-success">
            {showSignup ? "Log in" : "Create Account"}
          </button>
        </div>
        <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username-register" className="text-muted mb-1">
                <small>Username</small>
              </label>
              <input onChange={e => setUsername(e.target.value)} id="username-register" name="username" className="form-control" type="text" placeholder={showSignup ? "Pick a username" : "Username"} autoComplete="off" />
            </div>
            {showSignup && (
              <div className="form-group">
                <label htmlFor="email-register" className="text-muted mb-1">
                  <small>Email</small>
                </label>
                <input onChange={e => setEmail(e.target.value)} id="email-register" name="email" className="form-control" type="text" placeholder="you@example.com" autoComplete="off" />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="password-register" className="text-muted mb-1">
                <small>Password</small>
              </label>
              <input onChange={e => setPassword(e.target.value)} id="password-register" name="password" className="form-control" type="password" placeholder="Create a password" />
            </div>
            {showSignup && (
              <div className="form-group">
                <label htmlFor="leagueid-register" className="text-muted mb-1">
                  <small>League Id</small>
                </label>
                <input onChange={e => setLeagueId(e.target.value)} id="leagueid-register" name="leagueId" className="form-control" type="text" placeholder="Enter your league id" />
              </div>
            )}
            <button type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block">
              {showSignup ? "Sign Up" : "Log In" }
            </button>
          </form>
        </div>
      </div>
      </div>
    </div>
  )
}
