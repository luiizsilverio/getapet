import { createContext } from "react";

import useAuth from "../hooks/useAuth";

const UserContext = createContext();

function UserProvider({ children }) {
  const { authenticated, registerUser, login, logout } = useAuth();

  return (
    <UserContext.Provider value={{
      registerUser,
      login,
      logout,
      authenticated,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider };
