import express from "express";
import {
  createTransaction,
  getTransactions,
} from "../controllers/transactions.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.use(authenticate);
router.get("/", getTransactions);
router.post("/", createTransaction);

export default router;
