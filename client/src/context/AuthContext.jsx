import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Create axios instance with interceptors
  const api = axios.create({
    baseURL: "http://localhost:5000",
  });

  // Add request interceptor to include token
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptor to handle 401 errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setUser(null);
        setError("Session expired. Please login again.");
      }
      return Promise.reject(error);
    }
  );

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await api.get("/api/auth/me");
      setUser(res.data);
      setError(null);
    } catch (err) {
      console.error("Auth check failed:", err);
      localStorage.removeItem("token");
      setError(
        err.response?.data?.error || "Session expired. Please login again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      setLoading(true);
      const res = await api.post("/api/auth/login", credentials);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);

        // Fetch user details after successful login
        const userRes = await api.get("/api/auth/me");
        setUser(userRes.data);
      }

      return res.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      setError(errorMessage);
      throw err; // Re-throw the error for component handling
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        api, // Provide the configured axios instance
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
