import axios from "axios";

// 🌍 Base URL (dev + prod ready)
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: false,
});

// 🔐 REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Token access failed", error);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// 🚨 RESPONSE INTERCEPTOR (GLOBAL ERROR HANDLING)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Token invalid / expired
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("cart");

      // Optional: redirect to login
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
