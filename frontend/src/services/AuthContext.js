import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // === THE FIX ===
  // Start with a null token by default. This removes all persistence.
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // This effect now only runs when the token changes in memory.
    try {
      if (token) {
        const decodedUser = jwtDecode(token);
        setUser({
          email: decodedUser.sub,
          roles: decodedUser.roles || decodedUser.authorities || [],
        });
        // We no longer save the token to browser storage here.
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Invalid token:", error);
      setUser(null);
    }
  }, [token]);

  const login = (newToken) => {
    // When a user logs in, we set the token in React's state.
    setToken(newToken);
  };

  const logout = () => {
    // Logout simply clears the token from React's state.
    setToken(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.roles.includes("ADMIN");

  const value = { token, user, login, logout, isAuthenticated, isAdmin };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
