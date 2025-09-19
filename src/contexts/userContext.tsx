import React from 'react';
import Axios from 'axios';
import { useAuth0, User } from '@auth0/auth0-react';

interface UserContextType {
  user?: User,
  canEditBracket: boolean,
  isAuthenticated: boolean,
  logout: () => void,
}

const UserContext = React.createContext<UserContextType>({
  user: undefined,
  canEditBracket: false,
  isAuthenticated: false,
  logout: function () {},
});

export const UserContextProvider = ({ children }: any) => {
  const [canEditBracket, setCanEditBracket] = React.useState(false);
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const checkCanEditBracket = async (token: string): Promise<boolean> => {
    const response = await Axios.post("/bracket/canEdit", { token });
    console.log(`Can Edit Bracket Checked`);
    let canEditBracket = !!response?.data
    setCanEditBracket(canEditBracket)
    return canEditBracket
  }

  const contextValues = { user, canEditBracket, isAuthenticated, logout };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  )
};

export const useUserContext = () => React.useContext(UserContext);