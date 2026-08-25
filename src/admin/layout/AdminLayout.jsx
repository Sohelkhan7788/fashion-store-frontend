import { NavLink, Outlet, Link } from "react-router-dom";
import Logo from "../../components/Logo";

const AdminLayout = () => {
  const linkClass = ({ isActive }) =>
    `px-3.5 py-2 text-sm transition ${
      isActive
        ? "bg-ink text-paper"
        : "border border-line text-ink-soft hover:border-ink"
    }`;

  return (
    <div className="min-h-[70vh] bg-paper-dim/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <Link to="/">
            <Logo />
          </Link>
          <span className="text-xs uppercase tracking-widest text-ink-soft/50">
            Admin Panel
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
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
    </div>
  );
};

export default AdminLayout;
