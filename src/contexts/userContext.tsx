import React from 'react';
import Axios from 'axios';
import { User } from '../types';

interface UserContextType {
  user?: User,
  updateUser: (user?: User) => void,
  canEditBracket: boolean,
  isLoggedIn: boolean,
  logout: () => void
}

const UserContext = React.createContext<UserContextType>({
  user: undefined,
  updateUser: function () {},
  isLoggedIn: false,
  canEditBracket: false,
  logout: function () {}
});

export const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = React.useState<User>();
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [canEditBracket, setCanEditBracket] = React.useState(false);

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
        await Axios.post("/checktoken", { token: token }).then(async (response) => {
          if(isCancelled) {
            return;
          }
          if(!response.data){
            setIsLoggedIn(false);
            updateUser();
            return;
          } else {
            await Axios.post("/bracket/canEdit", { token: token }).then((response) => { 
              setCanEditBracket(response.data);
            })
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

  const contextValues = { user, updateUser, canEditBracket, isLoggedIn, logout };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  )
};

export const useUserContext = () => React.useContext(UserContext);