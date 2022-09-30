import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Bracket } from '../Bracket/Bracket';
import { Login } from '../Login/Login';
import { useUserContext } from '../contexts/userContext';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
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