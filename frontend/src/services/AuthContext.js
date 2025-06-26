import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // You may need to install this: npm install jwt-decode

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser({
          email: decodedUser.sub,
          roles: decodedUser.roles || [],
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

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isAuthenticated, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
