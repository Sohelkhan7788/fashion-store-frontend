import { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import Logo from "./Logo";

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
    `relative px-1 py-1 text-[13px] tracking-wide uppercase font-medium transition
     ${isActive ? "text-ink" : "text-ink-soft/70 hover:text-ink"}
     after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-full
     after:scale-x-0 after:origin-left after:bg-brass after:transition-transform after:duration-300
     ${isActive ? "after:scale-x-100" : "hover:after:scale-x-100"}
    `;

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300 border-b
          ${scrolled
            ? "backdrop-blur-md bg-paper/90 border-line shadow-[0_1px_0_0_rgba(0,0,0,0.02)]"
            : "bg-paper border-transparent"}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="shrink-0" aria-label="FashionStore home">
            <Logo />
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-9">
            <NavLink to="/" end className={linkClass}>Home</NavLink>
            <NavLink to="/shop" className={linkClass}>Shop</NavLink>
            <NavLink to="/blog" className={linkClass}>Journal</NavLink>

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
          <div className="flex items-center gap-5">

            {/* CART */}
            <Link to="/cart" className="relative text-ink" aria-label="Cart">
              <ShoppingBag size={21} strokeWidth={1.6} />
              {totalQty > 0 && (
                <span className="
                  absolute -top-2 -right-2
                  bg-ink text-paper text-[10px] font-semibold
                  h-[18px] w-[18px] flex items-center justify-center
                  rounded-full
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
                  className="bg-ink text-paper px-5 py-2.5 text-[13px] tracking-wide uppercase font-medium hover:bg-ink-soft transition"
                >
                  Login
                </NavLink>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-[13px] tracking-wide uppercase font-medium text-ink-soft/70 hover:text-ink transition"
                >
                  Logout
                </button>
              )}
            </div>

            {/* MOBILE MENU */}
            <button
              className="md:hidden text-ink"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-ink/40" onClick={() => setMenuOpen(false)}>
          <div
            className="
              absolute right-0 top-0 h-full w-4/5 max-w-xs
              bg-paper p-7 flex flex-col gap-1
              animate-slideIn
            "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="self-end text-ink mb-6"
              aria-label="Close menu"
            >
              <X size={22} strokeWidth={1.6} />
            </button>

            <MobileLink to="/">Home</MobileLink>
            <MobileLink to="/shop">Shop</MobileLink>
            <MobileLink to="/blog">Journal</MobileLink>
            <MobileLink to="/cart">Cart ({totalQty})</MobileLink>

            {isAuthenticated && (
              <>
                <MobileLink to="/my-orders">My Orders</MobileLink>
                <MobileLink to="/profile">Profile</MobileLink>
              </>
            )}

            {user?.isAdmin && <MobileLink to="/admin">Admin</MobileLink>}

            <div className="h-px bg-line my-4" />

            {!isAuthenticated ? (
              <MobileLink to="/login">Login</MobileLink>
            ) : (
              <button
                onClick={handleLogout}
                className="text-left py-3 text-rose font-medium"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-[68px]" />
    </>
  );
};

const MobileLink = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `py-3 text-[15px] font-medium border-b border-line/70 ${
        isActive ? "text-brass" : "text-ink"
      }`
    }
  >
    {children}
  </NavLink>
);

export default Navbar;
