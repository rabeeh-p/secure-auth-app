import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// Request interceptor to attach access token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to refresh token on 401 error
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh");
        if (!refreshToken) throw new Error("No refresh token available");

        const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", { refresh: refreshToken });

        const { access } = response.data;

        localStorage.setItem("access", access);

        // Update the original request's Authorization header
        originalRequest.headers["Authorization"] = `Bearer ${access}`;

        // Retry the original request with new access token
        return api(originalRequest);
      } catch (err) {
        // Refresh token is invalid or expired, logout user
        localStorage.clear();
        window.location.href = "/";  // or use navigate('/') in React component context
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
