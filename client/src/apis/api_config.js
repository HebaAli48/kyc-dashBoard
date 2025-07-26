import axios from "axios";
import { toast } from "react-toastify";
import { logout } from "../store/slices/authSlice";
import { baseUrl } from "../utils/Localization";
import store from "../store/store";

// Common response interceptor function
const responseInterceptor = (error) => {
  if (error.response) {
    const { status, data } = error.response;

    // Auto-logout if 401 Unauthorized
    if (status === 401) {
      store.dispatch(logout());
      // Redirect to login page after logout
      window.location.href = "/login";
    }

    const errorMessages = {
      400: `طلب غير صالح: ${data.message || "تحقق من البيانات المدخلة."}`,
      401: "غير مصرح: الرجاء تسجيل الدخول مرة أخرى.",
      403: "ممنوع: ليس لديك صلاحية للقيام بهذا الإجراء.",
      404: "غير موجود: لم يتم العثور على المورد المطلوب.",
      500: "خطأ في الخادم: حدث خطأ غير متوقع.",
      default: `خطأ: ${data.message || "حدث خطأ غير معروف."}`,
    };

    toast.error(errorMessages[status] || errorMessages.default);
  } else if (error.request) {
    toast.error("لم يتم تلقي أي استجابة من الخادم.");
  } else {
    toast.error(`خطأ في الإعدادات: ${error.message}`);
  }

  return Promise.reject(error);
};

// Create Axios instance with default config
const createAxiosInstance = (withAuth = true) => {
  const instance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": "ar", // Default to Arabic
    },
    // timeout: 30000, // 30 seconds timeout
  });

  // Add auth interceptor only if needed
  if (withAuth) {
    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`; // Fixed: Proper Bearer token format
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  // Add response interceptor
  instance.interceptors.response.use(
    (response) => response, // Pass through successful responses
    responseInterceptor // Handle errors
  );

  return instance;
};

// Main Axios instances
const api = createAxiosInstance(true); // With authentication
const apiWithoutAuth = createAxiosInstance(false); // Without authentication

export { api, apiWithoutAuth };
