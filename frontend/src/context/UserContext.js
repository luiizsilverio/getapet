import { createContext } from "react";

import useAuth from "../hooks/useAuth";

const UserContext = createContext();

function UserProvider({ children }) {
  const { authenticated, registerUser } = useAuth();

  return (
    <UserContext.Provider value={{ registerUser, authenticated }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider };
