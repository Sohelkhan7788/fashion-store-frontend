import { Navigate, Outlet } from "react-router-dom";

const AdminProtected = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.isAdmin) {
    return <Navigate to="/login" />;
  }

  return <Outlet />; // 👈 yahin se child routes render honge
};

export default AdminProtected;
