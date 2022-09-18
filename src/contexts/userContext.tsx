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
  const updateUser = (user: User) => {
    setUser(user);
    console.log(`User set! name: ${user.username} token: ${user.token}`);
  };

  const contextValues = { user, updateUser };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  )
};

export const useUserContext = () => React.useContext(UserContext);