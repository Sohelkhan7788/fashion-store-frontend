import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/api";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!email) {
    navigate("/forgot-password");
    return null;
  }

  const resetPassword = async (e) => {
    e.preventDefault();

    if (!otp || !password) {
      toast.warning("All fields required");
      return;
    }

    if (password.length < 6) {
      toast.warning("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/reset-password", {
        email,
        otp,
        newPassword: password,
      });

      toast.success("Password reset successful 🔐");
      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Password reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      <form
        onSubmit={resetPassword}
        className="w-full max-w-md border p-6 rounded-xl"
      >
        <h1 className="text-xl font-semibold mb-4">
          Reset Password
        </h1>

        <p className="text-sm text-gray-600 mb-3">
          OTP sent to <b>{email}</b>
        </p>

        <input
          placeholder="Enter OTP"
          className="w-full border p-2 rounded mb-3"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
