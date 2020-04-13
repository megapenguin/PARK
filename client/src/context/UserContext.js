import React, { createContext, useState } from "react";

const UserContext = createContext();

function UserContextProvider({ children }) {
  let [userData, setUserData] = useState("");

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
