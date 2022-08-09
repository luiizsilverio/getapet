import { createContext } from "react";

import useAuth from "../hooks/useAuth";

const UserContext = createContext();

function UserProvider({ children }) {
  const { registerUser } = useAuth();

  return (
    <UserContext.Provider value={{ registerUser }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider };
