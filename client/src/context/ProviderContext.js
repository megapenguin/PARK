import React, { createContext, useState } from "react";

const ProviderContext = createContext();

function ProviderContextProvider({ children }) {
  let [providerData, setProviderData] = useState("");

  return (
    <ProviderContext.Provider value={{ providerData, setProviderData }}>
      {children}
    </ProviderContext.Provider>
  );
}
export { ProviderContext, ProviderContextProvider };
