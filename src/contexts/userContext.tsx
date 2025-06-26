import React from 'react';
import Axios from 'axios';
import { User } from '../types';

interface UserContextType {
  user?: User,
  canEditBracket: boolean,
  isLoggedIn: boolean,
  login: (username: string, password: string) => Promise<boolean>,
  logout: () => void,
  register: (username: string, email: string, password: string, leagueId: string) => Promise<boolean>
}

const UserContext = React.createContext<UserContextType>({
  user: undefined,
  canEditBracket: false,
  isLoggedIn: false,
  login: function () { return Promise.resolve(false)},
  logout: function () {},
  register: function () { return Promise.resolve(false)},
});

export const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = React.useState<User>();
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [canEditBracket, setCanEditBracket] = React.useState(false);

  const logout = React.useCallback(() => {
    window.localStorage.removeItem("USERNAME");
    window.localStorage.removeItem("TOKEN");
    setIsLoggedIn(false);
    setUser(undefined);
  }, []);

  const updateUser = React.useCallback((user?: User) => {
    if(!user) {
      logout();
      return;
    }

    window.localStorage.setItem("USERNAME", user.username);
    window.localStorage.setItem("TOKEN", user.token);
    setIsLoggedIn(true);
    setUser(user);
  }, [logout]);

  const login = async (username: string, password: string): Promise<boolean> => {
    return await Axios.post("/login", { username, password }).then(async (response) => {
        return await checkCanEditBracket(response.data.token).then(_ => {
          updateUser({
            username: response.data.username,
            token: response.data.token
          });

          return response.status == 200
        })
    });
  }

  const register = async (username: string, email: string, password: string, leagueId: string): Promise<boolean> => {
    return await Axios.post("/register", { username, email, password, leagueId }).then((response) => {
      if(response.data?.username && response.data?.token) {
        updateUser({
          username: response.data?.username,
          token: response.data?.token
        });
      }
      return response.status == 200
    });
  }

  const checkToken = async (token: string): Promise<boolean> => {
    const response = await Axios.post("/checktoken", { token });
    console.log(`Token Checked`);
    return !!response?.data;
  };

  const checkCanEditBracket = async (token: string): Promise<boolean> => {
    const response = await Axios.post("/bracket/canEdit", { token });
    console.log(`Can Edit Bracket Checked`);
    let canEditBracket = !!response?.data
    setCanEditBracket(canEditBracket)
    return canEditBracket
  }

  React.useEffect(() => {
    if(!user?.username) {
      var isCancelled = false;
      const username = window.localStorage.getItem("USERNAME");
      const token = window.localStorage.getItem("TOKEN");

      if(!username || !token) {
        setIsLoggedIn(false);
        updateUser()
        return;
      }

      checkToken(token).then(isValid => {
        if(isCancelled) return;
        if(isValid) {
          checkCanEditBracket(token)
          updateUser({
            username: username,
            token: token
          });
        } else {
          setIsLoggedIn(false);
          updateUser()
          return;
        }
      });

      return () => {
        isCancelled = true
      }
    }
  }, [user?.username, updateUser]);

  const contextValues = { user, canEditBracket, isLoggedIn, login, logout, register };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  )
};

export const useUserContext = () => React.useContext(UserContext);