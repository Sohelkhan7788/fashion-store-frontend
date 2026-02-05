import { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { cart } = useContext(CartContext);
  const { user, logout, isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const navClass =
    "text-sm font-medium hover:text-gray-600 transition";

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* CART */}
        <Link to="/cart" className="relative">
          🛒
          {totalQty > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
              {totalQty}
            </span>
          )}
        </Link>

        {/* LOGO */}
        <Link to="/" className="text-xl font-bold">
          FashionStore
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navClass}>Home</NavLink>
          <NavLink to="/blog" className={navClass}>Blog</NavLink>

          {/* AUTHENTICATED USERS (USER + ADMIN BOTH) */}
          {isAuthenticated && (
            <>
              <NavLink to="/my-orders" className={navClass}>
                My Orders
              </NavLink>

              <NavLink to="/profile" className={navClass}>
                Profile
              </NavLink>
            </>
          )}

          {/* ADMIN */}
          {user?.isAdmin && (
            <NavLink to="/admin" className={navClass}>
              Admin
            </NavLink>
          )}

          {/* AUTH */}
          {!isAuthenticated ? (
            <>
              <NavLink to="/login" className={navClass}>Login</NavLink>
              <NavLink to="/register" className={navClass}>Register</NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-sm font-medium hover:underline"
            >
              Logout
            </button>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(prev => !prev)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-3">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/cart">Cart ({totalQty})</NavLink>

          {isAuthenticated && (
            <>
              <NavLink to="/my-orders">My Orders</NavLink>
              <NavLink to="/profile">Profile</NavLink>
            </>
          )}

          {user?.isAdmin && (
            <NavLink to="/admin">Admin</NavLink>
          )}

          {!isAuthenticated ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          ) : (
            <button onClick={handleLogout} className="text-left">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
