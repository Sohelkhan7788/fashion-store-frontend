import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout, authReady } = useContext(AuthContext);
  const navigate = useNavigate();

  // ⏳ wait until auth restore completes
  if (!authReady) {
    return null; // or loader
  }

  // safety (should not happen due to ProtectedRoute)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-[70vh] bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">

        {/* TITLE */}
        <h1 className="text-xl sm:text-2xl font-semibold mb-6">
          My Profile
        </h1>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* LEFT – PROFILE CARD */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full bg-black text-white flex items-center justify-center text-3xl font-bold">
              {user.name?.charAt(0)?.toUpperCase()}
            </div>

            <h2 className="mt-4 text-lg font-semibold">
              {user.name}
            </h2>

            <p className="text-sm text-gray-500 break-all">
              {user.email}
            </p>

            <button
              onClick={() => navigate("/my-orders")}
              className="mt-6 w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition"
            >
              View My Orders
            </button>
          </div>

          {/* RIGHT – DETAILS */}
          <div className="md:col-span-2 bg-white rounded-xl shadow p-6">

            <h3 className="text-lg font-semibold mb-4">
              Account Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">
                  Full Name
                </p>
                <p className="font-medium">
                  {user.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>
                <p className="font-medium break-all">
                  {user.email}
                </p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/profile/edit")}
                className="w-full sm:w-auto px-6 py-2 bg-black text-white rounded-lg hover:opacity-90 transition"
              >
                Edit Profile
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full sm:w-auto px-6 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Continue Shopping
              </button>

              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="w-full sm:w-auto px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition"
              >
                Logout
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
