import React, { createContext, useState } from "react";

const ParkingContext = createContext();

function ParkingContextProvider({ children }) {
  let [parkingData, setParkingData] = useState("");

  return (
    <ParkingContext.Provider value={{ parkingData, setParkingData }}>
      {children}
    </ParkingContext.Provider>
  );
}
export { ParkingContext, ParkingContextProvider };
