import { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { cart } = useContext(CartContext);
  const { user, logout, isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const totalQty = cart.reduce((s, i) => s + i.quantity, 0);

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `relative px-1 text-sm font-medium transition
     ${isActive ? "text-black" : "text-gray-600 hover:text-black"}
     after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full
     after:scale-x-0 after:bg-black after:transition
     ${isActive ? "after:scale-x-100" : "hover:after:scale-x-100"}
    `;

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${scrolled
            ? "backdrop-blur bg-white/80 shadow-md"
            : "bg-white"}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/"
            className="text-xl font-extrabold tracking-tight"
          >
            Fashion<span className="text-gray-500">Store</span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/blog" className={linkClass}>Blog</NavLink>

            {isAuthenticated && (
              <>
                <NavLink to="/my-orders" className={linkClass}>
                  Orders
                </NavLink>
                <NavLink to="/profile" className={linkClass}>
                  Account
                </NavLink>
              </>
            )}

            {user?.isAdmin && (
              <NavLink to="/admin" className={linkClass}>
                Admin
              </NavLink>
            )}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">

            {/* CART */}
            <Link to="/cart" className="relative text-2xl">
              🛒
              {totalQty > 0 && (
                <span className="
                  absolute -top-2 -right-2
                  bg-black text-white text-xs
                  h-5 w-5 flex items-center justify-center
                  rounded-full animate-pulse
                ">
                  {totalQty}
                </span>
              )}
            </Link>

            {/* AUTH */}
            <div className="hidden md:block">
              {!isAuthenticated ? (
                <NavLink
                  to="/login"
                  className="bg-black text-white px-4 py-2 rounded-lg text-sm"
                >
                  Login
                </NavLink>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-600 hover:text-black"
                >
                  Logout
                </button>
              )}
            </div>

            {/* MOBILE MENU */}
            <button
              className="md:hidden text-2xl"
              onClick={() => setMenuOpen(true)}
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="
            absolute right-0 top-0 h-full w-3/4 max-w-sm
            bg-white p-6 flex flex-col gap-4
            animate-slideIn
          ">
            <button
              onClick={() => setMenuOpen(false)}
              className="self-end text-xl"
            >
              ✕
            </button>

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
              <NavLink to="/login">Login</NavLink>
            ) : (
              <button
                onClick={handleLogout}
                className="text-left text-red-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
