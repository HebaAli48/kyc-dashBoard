import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import { baseUrl } from "../utils/Localization";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    loading: false, // Changed initial loading to false
    error: null,
  });

  // Create stable axios instance with useMemo
  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: baseUrl,
    });

    // Add request interceptor
    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userData");
          setAuthState((prev) => ({
            ...prev,
            user: null,
            error: "Session expired. Please login again.",
          }));
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, []);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthState((prev) => ({ ...prev, loading: false }));
      return;
    }

    try {
      const { data } = await api.get("/api/auth/me");
      setAuthState({
        user: data,
        loading: false,
        error: null,
      });
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      setAuthState({
        user: null,
        loading: false,
        error: err.response?.data?.error || "Authentication failed",
      });
    }
  }, [api]);

  const login = async (credentials) => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));

      const response = await api.post("/api/auth/login", credentials);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);

      setAuthState({
        user: response.data.user,
        loading: false,
        error: null,
      });

      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Login failed";
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuthState({
      user: null,
      loading: false,
      error: null,
    });
  };

  const contextValue = useMemo(
    () => ({
      ...authState,
      login,
      logout,
      api,
      checkAuth,
    }),
    [authState, api, checkAuth, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
