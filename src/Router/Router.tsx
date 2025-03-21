import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { About } from '../About/About';
import { Bracket } from '../Bracket/Bracket';
import { Header } from '../Header/Header';
import { Register } from '../Register/Register';
import { Standings } from '../Standings/Standings';
import { useUserContext } from '../contexts/userContext';
import { Footer } from '../Footer/Footer';

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
      <div className="app-container column" style={{ paddingTop: `${height}px` }}>
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