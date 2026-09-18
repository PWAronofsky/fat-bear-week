import React from 'react';
import Axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { User } from '../types';

interface UserContextType {
  user?: User,
  canEditBracket: boolean,
  isLoggedIn: boolean,
  isLoading: boolean,
  logout: () => void,
}

const UserContext = React.createContext<UserContextType>({
  user: undefined,
  canEditBracket: false,
  isLoggedIn: false,
  isLoading: true,
  logout: function () {},
});

export const UserContextProvider = ({ children }: any) => {
  const { user: auth0User, isAuthenticated, isLoading, getAccessTokenSilently, logout: auth0Logout } = useAuth0();
  const [user, setUser] = React.useState<User>();
  const [canEditBracket, setCanEditBracket] = React.useState(false);

  const checkCanEditBracket = React.useCallback(async (): Promise<void> => {
    try {
      const response = await Axios.post("/bracket/canEdit");
      setCanEditBracket(!!response?.data);
    } catch {
      setCanEditBracket(false);
    }
  }, []);

  React.useEffect(() => {
    let isCancelled = false;

    if (!isAuthenticated || !auth0User) {
      setUser(undefined);
      setCanEditBracket(false);
      delete Axios.defaults.headers.common['Authorization'];
      return;
    }

    getAccessTokenSilently().then((token) => {
      if (isCancelled || !token) return;

      Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser({
        username: auth0User.name ?? auth0User.email ?? auth0User.sub ?? '',
        token
      });
      checkCanEditBracket();
    });

    return () => {
      isCancelled = true;
    }
  }, [isAuthenticated, auth0User, getAccessTokenSilently, checkCanEditBracket]);

  const logout = React.useCallback(() => {
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });
  }, [auth0Logout]);

  const contextValues = { user, canEditBracket, isLoggedIn: isAuthenticated, isLoading, logout };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  )
};

export const useUserContext = () => React.useContext(UserContext);
