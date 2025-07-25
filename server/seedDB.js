import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./src/models/User.js";
import Transaction from "./src/models/Transaction.js";
import AuditLog from "./src/models/AuditLog.js";

const roles = [
  "global_admin",
  "regional_admin",
  "sending_partner",
  "receiving_partner", // Fixed typo from "receiving_partner"
];

const regions = ["north_america", "europe", "asia", "africa", "south_america"];
const statuses = ["pending", "completed", "rejected"];

const generateUsers = async (count = 10) => {
  const users = [];
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create specific users for each role
  users.push({
    username: "global_admin",
    password: hashedPassword,
    role: "global_admin",
    region: "global",
    email: "global_admin@example.com",
  });

  // Create regional admins
  regions.forEach((region) => {
    users.push({
      username: `${region}_admin`,
      password: hashedPassword,
      role: "regional_admin",
      region: region,
      email: `${region}_admin@example.com`,
    });
  });

  // Create sending and receiving partners
  for (let i = 0; i < count; i++) {
    const region = regions[Math.floor(Math.random() * regions.length)];
    users.push({
      username: `sender_${i + 1}`,
      password: hashedPassword,
      role: "sending_partner",
      region: region,
      email: `sender${i + 1}@example.com`,
    });

    users.push({
      username: `receiver_${i + 1}`,
      password: hashedPassword,
      role: "receiving_partner",
      region: region,
      email: `receiver${i + 1}@example.com`,
    });
  }

  return User.insertMany(users);
};

const generateTransactions = async (users, count = 50) => {
  const transactions = [];

  // Filter senders and receivers
  const senders = users.filter(
    (u) => u.role === "sending_partner" || u.role === "regional_admin"
  );
  const receivers = users.filter((u) => u.role === "receiving_partner");

  for (let i = 0; i < count; i++) {
    const sender = senders[Math.floor(Math.random() * senders.length)];
    const receiver = receivers[Math.floor(Math.random() * receivers.length)];
    const admin =
      users.find(
        (u) => u.role === "regional_admin" && u.region === sender.region
      ) || users.find((u) => u.role === "global_admin");

    transactions.push({
      amount: Math.floor(Math.random() * 10000) + 100,
      currencyFrom: "USD",
      currencyTo: "USDC",
      conversionRate: 1.0,
      sender: sender._id, // Using ObjectId reference
      receiver: receiver._id, // Using ObjectId reference
      region: sender.region,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      createdBy: admin._id,
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
      ), // Random date in last 30 days
    });
  }

  return Transaction.insertMany(transactions);
};

const generateAuditLogs = async (users, count = 100) => {
  const actions = ["login", "transaction_create", "user_create", "kyc_verify"];
  const logs = [];

  for (let i = 0; i < count; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    logs.push({
      action: actions[Math.floor(Math.random() * actions.length)],
      userId: user._id,
      details: `${user.role} ${user.username} performed action`,
      status: Math.random() > 0.1 ? "success" : "failed",
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
      ),
    });
  }

  return AuditLog.insertMany(logs);
};

export const seedDatabase = async () => {
  try {
    // Clear existing data
    await mongoose.connection.dropDatabase();
    console.log("Dropped existing database");

    // Generate new data
    const users = await generateUsers();
    const transactions = await generateTransactions(users);
    const auditLogs = await generateAuditLogs(users);

    console.log("Database seeded successfully!");
    console.log(`Created:
      - ${users.length} users
      - ${transactions.length} transactions
      - ${auditLogs.length} audit logs`);

    // Create indexes
    await User.createIndexes();
    await Transaction.createIndexes();
    await AuditLog.createIndexes();

    return true;
  } catch (error) {
    console.error("Error seeding database:", error);
    return false;
  }
};

// Run directly if executed via command line
if (process.argv.includes("--run-seed")) {
  mongoose
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/yourdbname")
    .then(() => seedDatabase())
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
