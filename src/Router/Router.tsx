import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { About } from '../About/About';
import { Bracket } from '../Bracket/Bracket';
import { Header } from '../Header/Header';
import { Register } from '../Register/Register';
import { Standings } from '../Standings/Standings';
import { useUserContext } from '../contexts/userContext';
import { Footer } from '../Footer/Footer';
import { useAuth0 } from '@auth0/auth0-react';

export const Router = () => {
  const headerRef = React.useRef<HTMLElement>(null);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    const observer = new ResizeObserver(entries => {
      setHeight(entries[0].contentRect.height);
    });

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="app-background"/>
      <Header ref={headerRef} />
      <div className="app-container" style={{ paddingTop: `${height}px` }}>
        <Routes>
          <Route path="/" element={
            <LoggedInRedirect>
              <Register />
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
      </div>
      <Footer />
    </BrowserRouter>
  )
}

const ProtectedRoute = ({ children }: any) => {
  const { isAuthenticated } = useUserContext();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const LoggedInRedirect = ({ children }: any) => {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return <Navigate to="/bracket" replace />;
  }

  return children;
}