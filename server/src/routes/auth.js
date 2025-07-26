import express from "express";
import {
  login,
  register,
  getMe,
  getAllUsers,
  getUserStats,
} from "../controllers/auth.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, getMe); // Protected route
router.get("/", authenticate, getAllUsers);
router.get("/stats", authenticate, getUserStats);
export default router;
