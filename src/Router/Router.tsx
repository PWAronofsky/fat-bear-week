import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { About } from '../About/About';
import { Bracket } from '../Bracket/Bracket';
import { Header } from '../Header/Header';
import { Login } from '../Login/Login';
import { Standings } from '../Standings/Standings';
import { useUserContext } from '../contexts/userContext';
import { Footer } from '../Footer/Footer';

export const Router = () => {
  return (
    <BrowserRouter>
      <div className="main-background">
        <Header />
        <Routes>
          <Route path="/" element={
            <LoggedInRedirect>
              <Login />
            </LoggedInRedirect>
          } />
          <Route path="/bracket" element={
            <ProtectedRoute>
              <Bracket />
            </ProtectedRoute>
          } />
          <Route path="/standings" element={
            <ProtectedRoute>
              <Standings />
            </ProtectedRoute>
          } />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
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