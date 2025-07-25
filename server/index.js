import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import dotenv from "dotenv";
import { seedDatabase } from "./seedDB.js"; // Import the seeding function
import authRoutes from "./src/routes/auth.js";
import transactionRoutes from "./src/routes/transactions.js";
import auditRoutes from "./src/routes/audit.js";

dotenv.config();

const app = express();

// Middleware
app.use(helmet());

// Update your CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Your frontend origin
  credentials: true, // Allow credentials
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Database connection and seeding
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Check if collections are empty and seed data
    const usersCount = await mongoose.connection.db
      .collection("users")
      .countDocuments();
    if (usersCount === 0) {
      console.log("Seeding database with dummy data...");
      await seedDatabase();
    }
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/audit", auditRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
