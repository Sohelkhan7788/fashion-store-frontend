import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const container = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.warning("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", form);

      // ✅ UPDATE AUTH CONTEXT (ONLY THIS)
      login(res.data.user, res.data.token);

      toast.success("Login successful 🎉");

      // ✅ REDIRECT BACK OR HOME
      const redirectTo =
        location.state?.from?.pathname || "/";

      navigate(redirectTo, { replace: true });

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md bg-white rounded-xl shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="font-medium underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
