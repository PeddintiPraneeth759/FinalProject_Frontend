import { createContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets";
import { use } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currency_symbol = "$";

  // Persist the login state and user role
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("userRole") || ""; // Default empty if no role is set
  });

  useEffect(() => {
    // Persist isLoggedIn and userRole in localStorage
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("userRole", userRole);
  }, [isLoggedIn, userRole]);

  const value = {
    doctors,
    currency_symbol,
    isLoggedIn,
    setIsLoggedIn,
    userRole,
    setUserRole, // Provide the setter for updating the user role
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
