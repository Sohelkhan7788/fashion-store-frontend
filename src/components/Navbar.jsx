import { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 🛒 CART CONTEXT
  const { cart } = useContext(CartContext);

  const totalQty = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  /* 🔁 Sync user from localStorage */
  const loadUser = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  };

  useEffect(() => {
    loadUser();
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

        {/* LEFT : CART ICON */}
        <Link to="/cart" className="relative flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>


          {/* LIVE COUNT */}
          {totalQty > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
              {totalQty}
            </span>
          )}
        </Link>

        {/* CENTER : LOGO */}
        <Link to="/" className="text-xl font-bold">
          FashionStore
        </Link>

        {/* RIGHT : DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/blog" className={navClass}>
            Blog
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
                Hi, {user.name?.split(" ")[0]}
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
            Cart ({totalQty})
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
