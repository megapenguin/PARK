import React, { createContext, useState } from "react";

const TransactionContext = createContext();

function TransactionContextProvider({ children }) {
  let [transactionData, setTransactionData] = useState("");

  return (
    <TransactionContext.Provider
      value={{ transactionData, setTransactionData }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export { TransactionContext, TransactionContextProvider };
