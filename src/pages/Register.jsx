import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const container = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // 🔐 Already logged-in user → redirect
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ OTP-based register submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanName = form.name.trim();
    const cleanEmail = form.email.trim().toLowerCase();
    const password = form.password;

    if (!cleanName || !cleanEmail || !password) {
      toast.warning("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      toast.warning("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        name: cleanName,
        email: cleanEmail,
        password,
      });

      toast.success("OTP sent to your email 📧");

      // 🔁 Redirect to OTP verify page
      navigate("/verify-otp", {
        state: { email: cleanEmail },
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed"
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
        className="w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2 bg-gray-900 text-white"
      >
        {/* Left Branding */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-gray-900 to-black">
          <motion.h2 variants={item} className="text-3xl font-bold mb-4">
            Create Account
          </motion.h2>
          <motion.p variants={item} className="text-gray-300">
            Join us to explore the latest fashion trends.
          </motion.p>
        </div>

        {/* Right Form */}
        <div className="bg-white text-black p-8 sm:p-10">
          <motion.h2
            variants={item}
            className="text-2xl font-bold mb-6 text-center"
          >
            Sign Up
          </motion.h2>

          <motion.form
            variants={container}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <motion.input
              variants={item}
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none"
            />

            <motion.input
              variants={item}
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none"
            />

            <motion.input
              variants={item}
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none"
            />

            <motion.button
              variants={item}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300 }}
              disabled={loading}
              type="submit"
              className={`w-full py-3 rounded-lg font-medium text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              {loading ? "Sending OTP..." : "Register"}
            </motion.button>
          </motion.form>

          <motion.p variants={item} className="text-sm text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="font-medium underline">
              Login
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
