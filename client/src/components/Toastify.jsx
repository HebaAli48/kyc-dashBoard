// src/utils/toastify.js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toastify = (type = "success", message = "", options = {}) => {
  const defaultOptions = {
    position: "top-right",
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options,
  };

  switch (type) {
    case "success":
      toast.success(message || "✅ تم بنجاح!", defaultOptions);
      break;
    case "error":
      toast.error(message || "❌ حدث خطأ ما!", defaultOptions);
      break;
    case "info":
      toast.info(message || "ℹ️ معلومة!", defaultOptions);
      break;
    case "warn":
      toast.warn(message || "⚠️ تحذير!", defaultOptions);
      break;
    default:
      toast(message || "📢 إشعار!", defaultOptions);
  }
};

export default Toastify;
