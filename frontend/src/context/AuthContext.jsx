// File: src/context/AuthContext.jsx

import { createContext, useState, useEffect } from "react";
// In a real app, you would run: npm install jwt-decode
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser({
          email: decodedUser.sub,
          // The backend JWT might use 'roles' or 'authorities'. Adjust if needed.
          roles: decodedUser.roles || decodedUser.authorities || [],
        });
        localStorage.setItem("token", token);
      } catch (error) {
        console.error("Invalid token:", error);
        setUser(null);
        localStorage.removeItem("token");
      }
    } else {
      setUser(null);
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.roles.includes("ADMIN");

  const value = { token, user, login, logout, isAuthenticated, isAdmin };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
