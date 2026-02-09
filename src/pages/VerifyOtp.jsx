import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/api";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // 🔐 Email from previous page (register)
  const email = location.state?.email;

  // ❌ If page refreshed or email missing → redirect
  useEffect(() => {
    if (!email) {
      toast.error("Invalid access. Please register again.");
      navigate("/register");
    }
  }, [email, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();

    const cleanEmail = email?.trim().toLowerCase();

    if (!otp) {
      toast.warning("Enter OTP");
      return;
    }

    if (otp.length !== 6) {
      toast.warning("OTP must be 6 digits");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/verify-otp", {
        email: cleanEmail,
        otp,
      });

      toast.success("Account verified successfully 🎉");

      // 🔁 Redirect to login
      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Verify OTP
        </h2>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, ""))
            }
            maxLength={6}
            className="w-full border rounded-lg px-4 py-3 text-center tracking-widest text-lg focus:ring-2 focus:ring-black outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:opacity-90"
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
