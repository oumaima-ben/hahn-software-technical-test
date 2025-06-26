import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// This custom hook is the standard way to consume the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
