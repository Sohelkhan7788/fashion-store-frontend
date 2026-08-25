import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-ink text-paper/60 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">

        {/* BRAND */}
        <div className="space-y-4">
          <h2 className="text-paper text-2xl font-display italic font-medium tracking-tight">
            FashionStore
          </h2>
          <p className="text-sm leading-relaxed text-paper/50 max-w-xs">
            Modern fashion essentials designed for comfort,
            confidence, and everyday living.
          </p>
        </div>

        {/* NAVIGATION */}
        <div>
          <h3 className="text-paper text-xs font-semibold mb-4 uppercase tracking-widest">
            Company
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/blog" className="hover:text-brass-light transition">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-brass-light transition">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="hover:text-brass-light transition">
                Shipping & Returns
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-paper text-xs font-semibold mb-4 uppercase tracking-widest">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-paper/50">
            <li>San Francisco, CA</li>
            <li>Email: soyalkhan@gmail.com</li>
            <li>Phone: +91 80056 20439</li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-paper text-xs font-semibold mb-4 uppercase tracking-widest">
            Follow
          </h3>
          <div className="flex gap-4">
            {[
              {
                href: "https://www.instagram.com/callmesohel.439/",
                label: "Instagram",
                path:
                  "M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7Zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10Zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z",
              },
              {
                href: "#",
                label: "Facebook",
                path:
                  "M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.7-1.6 1.5V12H16l-.5 3h-2.5v7A10 10 0 0 0 22 12Z",
              },
              {
                href: "#",
                label: "Twitter",
                path:
                  "M23 3a10.9 10.9 0 0 1-3.1 1A4.48 4.48 0 0 0 22 1a9 9 0 0 1-2.8 1.1A4.5 4.5 0 0 0 12 6.1V7a10.66 10.66 0 0 1-9-4.6S1 8 6 10a4.52 4.52 0 0 1-2 0c0 2.3 1.6 4.3 3.8 4.8A4.52 4.52 0 0 1 6 15c.6 2 2.5 3.4 4.7 3.4A9 9 0 0 1 1 20a12.94 12.94 0 0 0 7 2c8.4 0 13-7 13-13v-.6A9.18 9.18 0 0 0 23 3Z",
              },
            ].map((icon, i) => (
              <a
                key={i}
                href={icon.href}
                aria-label={icon.label}
                className="
                  h-10 w-10 flex items-center justify-center
                  rounded-full border border-paper/20
                  hover:border-brass hover:text-brass-light
                  transition
                "
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d={icon.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-paper/10 py-6 text-center text-xs text-paper/40">
        © 2025 FashionStore. Crafted by Sohel Khan.
      </div>
    </footer>
  );
};

export default Footer;
