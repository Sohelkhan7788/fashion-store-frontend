import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="text-xl font-bold">
          FashionStore
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className="hover:text-gray-600">
            Home
          </NavLink>
          <NavLink to="/blog" className="hover:text-gray-600">
            Blog
          </NavLink>
          <NavLink to="/cart" className="hover:text-gray-600">
            Cart
          </NavLink>

          {user?.isAdmin && (
            <NavLink to="/admin/products" className="font-medium">
              Admin
            </NavLink>
          )}

          {!user ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          ) : (
            <button onClick={handleLogout}>Logout</button>
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
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-4 text-base">
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
              to="/admin/products"
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
                <NavLink to="/register" onClick={closeMenu} className="block mt-2">
                  Register
                </NavLink>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="block w-full text-left"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
