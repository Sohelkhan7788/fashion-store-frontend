import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminProtected = () => {
  const { user, authReady } = useContext(AuthContext);

  if (!authReady) return null;

  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminProtected;
