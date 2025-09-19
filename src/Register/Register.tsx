import React from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/userContext';
import { useAuth0 } from "@auth0/auth0-react";

export const Register = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [leagueId, setLeagueId] = React.useState('');
  const [fetchingData, setFetchingData] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const { loginWithRedirect, user, isAuthenticated } = useAuth0();

  const navigate = useNavigate();


  const LoginButton = () => {
  
    return <button onClick={() => loginWithRedirect()}>Log In</button>;
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      console.log(user);
      navigate("/bracket");
    }
  }, [isAuthenticated]);

  return (
    <div className="page-container">
      <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-7 py-3 py-md-5">
          <h1 className="display-3">Fat Bear Week!</h1>
          <p className="lead text-dark">It's that time again, mama bears and brave cubs! The showdown of the year! Fill out your brackets, and may the chunkiest bear win!</p>
          {errorMessage!! && (<p className="lead text-dark">Error: {errorMessage}</p>)}
        </div>
        <LoginButton />
      </div>
      </div>
    </div>
  )
}
