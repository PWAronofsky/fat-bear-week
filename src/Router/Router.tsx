import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Bracket } from '../Bracket/Bracket';
import { Header } from '../Header/Header';
import { Login } from '../Login/Login';
import { useUserContext } from '../contexts/userContext';

export const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={
          // <LoggedInRedirect>
            <Login />
          // </LoggedInRedirect>
        } />
        <Route path="/bracket" element={
          <ProtectedRoute>
            <Bracket />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

const ProtectedRoute = ({ children }: any) => {
  const { isLoggedIn } = useUserContext();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const LoggedInRedirect = ({ children }: any) => {
  const { isLoggedIn } = useUserContext();

  if (isLoggedIn) {
    return <Navigate to="/bracket" replace />;
  }

  return children;
}