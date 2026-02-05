import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "px-3 py-1 bg-black text-white rounded"
      : "px-3 py-1 border rounded";

  return (
    <div className="max-w-5xl mx-auto px-4 py-4">
      <h1 className="text-xl font-semibold mb-4">Admin Panel</h1>

      <div className="flex gap-2 mb-6 text-sm">
        <NavLink to="/admin" end className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/products" className={linkClass}>
          Products
        </NavLink>
        <NavLink to="/admin/orders" className={linkClass}>
          Orders
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default AdminLayout;
