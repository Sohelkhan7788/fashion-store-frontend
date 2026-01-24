import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../utils/api";

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

  // 🔐 GUARD: logged-in user should not access register page
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
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
            Join Fashion Store
          </motion.h2>
          <motion.p variants={item} className="text-gray-300">
            Create an account and start shopping premium fashion today.
          </motion.p>
        </div>

        {/* Right Form */}
        <div className="bg-white text-black p-8 sm:p-10">
          <motion.h2
            variants={item}
            className="text-2xl font-bold mb-6 text-center"
          >
            Create Account
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
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none"
              onChange={handleChange}
              required
            />

            <motion.input
              variants={item}
              type="email"
              name="email"
              placeholder="Email"
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none"
              onChange={handleChange}
              required
            />

            <motion.input
              variants={item}
              type="password"
              name="password"
              placeholder="Password"
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none"
              onChange={handleChange}
              required
            />

            <motion.button
              variants={item}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300 }}
              disabled={loading}
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </motion.button>
          </motion.form>

          <motion.p
            variants={item}
            className="text-sm text-center mt-6"
          >
            Already have an account?{" "}
            <Link to="/login" className="font-medium underline">
              Sign In
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
