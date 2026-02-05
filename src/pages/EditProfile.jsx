import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";

const EditProfile = () => {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.warning("Name cannot be empty");
      return;
    }

    try {
      setLoading(true);

      const res = await api.put("/users/profile", {
        name,
        password: password || undefined,
      });

      // 🔥 Update context + localStorage
      login(res.data, localStorage.getItem("token"));

      toast.success("Profile updated successfully ✅");
      navigate("/profile");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] bg-gray-100 px-4 py-10">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-xl font-semibold mb-6">
          Edit Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              New Password (optional)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current password"
              className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-black text-white py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="flex-1 border rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
