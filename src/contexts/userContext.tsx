import React from 'react';
import Axios from 'axios';
import { User } from '../types';

interface UserContextType {
  user?: User,
  updateUser: (user?: User) => void,
  isLoggedIn: boolean,
  logout: () => void
}

const UserContext = React.createContext<UserContextType>({
  user: undefined,
  updateUser: function () {},
  isLoggedIn: true,
  logout: function () {}
});

export const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = React.useState<User>();
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  const logout = React.useCallback(() => {
    setUser(undefined);
    setIsLoggedIn(false);
    window.localStorage.removeItem("USERNAME");
    window.localStorage.removeItem("TOKEN");
  }, []);

  const updateUser = React.useCallback((user?: User) => {
    if(!user) {
      logout();
      return;
    }

    window.localStorage.setItem("USERNAME", user.username);
    window.localStorage.setItem("TOKEN", user.token);
    setUser(user);
    setIsLoggedIn(true);
  }, [logout]);

  React.useEffect(() => {
    if(!user?.username){
      let isCancelled = false;
      const username = window.localStorage.getItem("USERNAME");
      const token = window.localStorage.getItem("TOKEN");

      if(!username || !token) {
        setIsLoggedIn(false);
        return;
      }

      const checkToken = async () => {
        await Axios.post(`${process.env.REACT_APP_API_BASE_URL}/checktoken`, { token: token }).then((response) => {
          if(isCancelled) {
            return;
          }
          if(!response.data){
            setIsLoggedIn(false);
            updateUser();
          } else {
            setIsLoggedIn(true);
            updateUser({
              username: username,
              token: token
            });
          }
        });
      }

      checkToken();
    }
  }, [user?.username, updateUser]);

  const contextValues = { user, updateUser, isLoggedIn, logout };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  )
};

export const useUserContext = () => React.useContext(UserContext);