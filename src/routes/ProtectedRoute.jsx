import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, authReady } = useContext(AuthContext);
  const location = useLocation();

  // ⏳ Wait until auth restore finishes
  if (!authReady) {
    return null; // or loader
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
