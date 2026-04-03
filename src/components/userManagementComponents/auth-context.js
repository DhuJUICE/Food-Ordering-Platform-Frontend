import { createContext, useState, useEffect, useContext } from "react";
import { checkAuth } from "../apiComponents/api-signIn";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const refreshAuth = async () => {
    const status = await checkAuth();
    setIsLoggedIn(status);
  };

  useEffect(() => {
    refreshAuth(); // initial check
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, refreshAuth, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);