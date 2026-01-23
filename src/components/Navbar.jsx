import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const { user } = useUser();

  return (
    <>
      {/* TOP BAR */}
      <header className="sticky top-0 z-40 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* BRAND */}
          <Link to="/" className="text-lg font-semibold tracking-wide">
            Fashion Store
          </Link>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-6">

            {/* CART */}
            <Link to="/cart" className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835L6.75 12.75m0 0h10.5m-10.5 0L5.25 6h13.5l-1.5 6.75m-9 3.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm9 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>

              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* MENU BUTTON */}
            <button onClick={() => setMenuOpen(true)}>
              <div className="space-y-1">
                <span className="block w-6 h-0.5 bg-black"></span>
                <span className="block w-6 h-0.5 bg-black"></span>
                <span className="block w-6 h-0.5 bg-black"></span>
              </div>
            </button>

          </div>
        </div>
      </header>

      {/* SLIDE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="w-1/3 bg-black/40"
            onClick={() => setMenuOpen(false)}
          ></div>

          <div className="w-2/3 bg-white p-8 animate-slideIn">
            <div className="flex justify-between items-center mb-10">
              <span className="text-lg font-semibold">Menu</span>
              <button onClick={() => setMenuOpen(false)} className="text-2xl">
                ✕
              </button>
            </div>

            <ul className="space-y-6 text-base text-gray-800">

              <li>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
              </li>

              <li>
                <Link to="/my-orders" onClick={() => setMenuOpen(false)}>
                  My Orders
                </Link>
              </li>

              <li>
                <Link to="/blog" onClick={() => setMenuOpen(false)}>
                  About
                </Link>
              </li>

              {!user && (
                <li>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    Login
                  </Link>
                </li>
              )}

              {/* ADMIN LINK */}
              {user?.publicMetadata?.role === "admin" && (
                <li>
                  <Link
                    to="/admin/products"
                    onClick={() => setMenuOpen(false)}
                    className="font-semibold text-black"
                  >
                    Admin Panel
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
