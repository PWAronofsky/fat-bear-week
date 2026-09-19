import { useAuth0 } from '@auth0/auth0-react';

export const Register = () => {
  const { loginWithRedirect } = useAuth0();

  const login = () => loginWithRedirect();
  const signup = () => loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } });

  return (
    <div className="page-container">
      <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-7 py-3 py-md-5">
          <h1 className="display-3">Fat Bear Week!</h1>
          <p className="lead text-dark">It's that time again, mama bears and brave cubs! The showdown of the year! Fill out your brackets, and may the chunkiest bear win!</p>
        </div>
        <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
          <button onClick={signup} className="py-3 mt-4 btn btn-lg btn-success btn-block">
            Sign Up
          </button>
          <button onClick={login} className="py-3 mt-3 btn btn-lg btn-secondary btn-block">
            Log In
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}
