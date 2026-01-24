import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-blue-600 text-white"
      : "text-gray-700 hover:bg-gray-100";

  return (
    <aside className="w-64 bg-white border-r min-h-screen">
      <div className="p-6 text-lg font-semibold">
        Admin
      </div>

      <nav className="px-4 space-y-2">
        <Link
          to="/admin/dashboard"
          className={`block px-4 py-2 rounded-lg ${isActive(
            "/admin/dashboard"
          )}`}
        >
          Dashboard
        </Link>
        <Link
          to="/admin/products"
          className={`block px-4 py-2 rounded-lg ${isActive(
            "/admin/products"
          )}`}
        >
          Products
        </Link>

        <Link
          to="/admin/add-product"
          className={`block px-4 py-2 rounded-lg ${isActive(
            "/admin/add-product"
          )}`}
        >
          Add Product
        </Link>

        <Link
          to="/admin/orders"
          className={`block px-4 py-2 rounded-lg ${isActive(
            "/admin/orders"
          )}`}
        >
          Orders
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
