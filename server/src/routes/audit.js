import express from "express";
import { getAuditLogs } from "../controllers/audit.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

router.use(authenticate);
router.use(authorize(["global_admin", "regional_admin"]));
router.get("/", getAuditLogs);

export default router;
