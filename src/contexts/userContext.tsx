import React from 'react';
import { User } from '../types';

interface UserContextType {
  user?: User,
  updateUser: (user: User) => void
}

const UserContext = React.createContext<UserContextType>({
  user: undefined,
  updateUser: function () {}
});

export const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = React.useState<User>();
  React.useEffect(() => {
    console.log(user);
    if(!user){
      const username = window.localStorage.getItem("USERNAME");
      const token = window.localStorage.getItem("TOKEN");
      if(!username || !token) {
        return;
      }

      updateUser({
        username: username,
        token: token
      });
    }
  }, [user]);

  const updateUser = (user: User) => {
    window.localStorage.setItem("USERNAME", user.username);
    window.localStorage.setItem("TOKEN", user.token);
    setUser(user);
  };

  const contextValues = { user, updateUser };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  )
};

export const useUserContext = () => React.useContext(UserContext);