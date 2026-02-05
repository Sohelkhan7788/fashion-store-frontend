import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  // 🔁 Restore auth on refresh
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (err) {
      console.error("Auth restore failed", err);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } finally {
      setAuthReady(true); // 🔥 VERY IMPORTANT
    }
  }, []);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        authReady,
        isAuthenticated: !!user && !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
