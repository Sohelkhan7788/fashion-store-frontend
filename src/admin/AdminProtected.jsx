import { Navigate, Outlet } from "react-router-dom";

const AdminProtected = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // logged in but not admin
  if (!user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminProtected;
