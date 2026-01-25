import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  /* 🔁 Sync user from localStorage */
  const loadUser = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  };

  useEffect(() => {
    loadUser();

    // listen storage changes (login/logout)
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  const navClass = ({ isActive }) =>
    isActive ? "font-semibold text-black" : "hover:text-gray-600";

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="text-xl font-bold">
          FashionStore
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/blog" className={navClass}>
            Blog
          </NavLink>
          <NavLink to="/cart" className={navClass}>
            Cart
          </NavLink>

          {/* 🛡️ ADMIN */}
          {user?.isAdmin && (
            <NavLink to="/admin/dashboard" className="font-medium">
              Admin
            </NavLink>
          )}

          {/* 👤 AUTH */}
          {!user ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">
                Hi, {user.name.split(" ")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm hover:underline"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-4">
          <NavLink to="/" onClick={closeMenu} className="block">
            Home
          </NavLink>
          <NavLink to="/blog" onClick={closeMenu} className="block">
            Blog
          </NavLink>
          <NavLink to="/cart" onClick={closeMenu} className="block">
            Cart
          </NavLink>

          {user?.isAdmin && (
            <NavLink
              to="/admin/dashboard"
              onClick={closeMenu}
              className="block font-medium"
            >
              Admin Panel
            </NavLink>
          )}

          <div className="border-t pt-4">
            {!user ? (
              <>
                <NavLink to="/login" onClick={closeMenu} className="block">
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={closeMenu}
                  className="block mt-2"
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <div className="text-sm mb-2">
                  Logged in as <b>{user.email}</b>
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
