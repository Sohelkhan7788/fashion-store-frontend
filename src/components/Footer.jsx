import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-20">
      <div className="max-w-5xl mx-auto px-6 py-14 space-y-10 text-center">

        {/* 🔹 ADDRESS */}
        <div className="text-sm text-gray-600 space-y-1">
          <p>500 Terry Francine St.</p>
          <p>San Francisco, CA 94158</p>
          <p>Email: soyalkhan@gmail.com</p>
          <p>Phone: 8005620439</p>
        </div>

        {/* 🔹 LINKS */}
        <div className="flex justify-center gap-6 text-sm font-medium">
          <Link to="/shipping" className="hover:underline">
            Shipping & Returns
          </Link>
          <Link to="/faq" className="hover:underline">
            FAQ
          </Link>
        </div>

        {/* 🔹 SOCIAL ICONS */}
        <div className="flex justify-center gap-6">
          <a href="https://www.instagram.com/callmesohel.439/" aria-label="Instagram">
            <svg className="h-5 w-5 hover:opacity-70" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7Zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10Zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"/>
            </svg>
          </a>

          <a href="#" aria-label="Facebook">
            <svg className="h-5 w-5 hover:opacity-70" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.7-1.6 1.5V12H16l-.5 3h-2.5v7A10 10 0 0 0 22 12Z"/>
            </svg>
          </a>

          <a href="#" aria-label="Twitter">
            <svg className="h-5 w-5 hover:opacity-70" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 0 1-3.1 1A4.48 4.48 0 0 0 22 1a9 9 0 0 1-2.8 1.1A4.5 4.5 0 0 0 12 6.1V7a10.66 10.66 0 0 1-9-4.6S1 8 6 10a4.52 4.52 0 0 1-2 0c0 2.3 1.6 4.3 3.8 4.8A4.52 4.52 0 0 1 6 15c.6 2 2.5 3.4 4.7 3.4A9 9 0 0 1 1 20a12.94 12.94 0 0 0 7 2c8.4 0 13-7 13-13v-.6A9.18 9.18 0 0 0 23 3Z"/>
            </svg>
          </a>
        </div>

        {/* 🔹 COPYRIGHT */}
        <p className="text-xs text-gray-500">
          © 2025 by Sohel Khan
        </p>

      </div>
    </footer>
  );
};

export default Footer;
