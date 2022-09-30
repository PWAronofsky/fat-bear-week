import React from 'react';
import { User } from '../types';

interface UserContextType {
  user?: User,
  updateUser: (user?: User) => void,
  isLoggedIn: boolean
}

const UserContext = React.createContext<UserContextType>({
  user: undefined,
  updateUser: function () {},
  isLoggedIn: true
});

export const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = React.useState<User>();
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  React.useEffect(() => {
    if(!user){
      const username = window.localStorage.getItem("USERNAME");
      const token = window.localStorage.getItem("TOKEN");
      if(!username || !token) {
        setIsLoggedIn(false);
        return;
      }

      updateUser({
        username: username,
        token: token
      });
    }
  }, [user]);

  const updateUser = (user?: User) => {
    if(!user) {
      setUser(undefined);
      setIsLoggedIn(false);
      return;
    }

    window.localStorage.setItem("USERNAME", user.username);
    window.localStorage.setItem("TOKEN", user.token);
    setUser(user);
    setIsLoggedIn(true);
  };

  const contextValues = { user, updateUser, isLoggedIn };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  )
};

export const useUserContext = () => React.useContext(UserContext);