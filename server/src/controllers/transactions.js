import Transaction from "../models/Transaction.js";
import AuditLog from "../models/AuditLog.js";
import User from "../models/User.js";
import redisClient from "../config/redis.js";

const CACHE_EXPIRATION = 60; // 5 minutes

const getCacheKey = (user) => `transactions:${user.region}:${user._id}`;

export const createTransaction = async (req, res) => {
  try {
    const { amount, currencyFrom, currencyTo, receiverUsername } = req.body;

    // Validation logic (same as before)
    if (!amount || !currencyFrom || !currencyTo || !receiverUsername) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // ... other validations

    const receiverUser = await User.findOne({ username: receiverUsername });
    if (!receiverUser)
      return res.status(404).json({ error: "Receiver not found" });

    // Create transaction
    const transaction = new Transaction({
      amount,
      currencyFrom,
      currencyTo,
      conversionRate: await getConversionRate(currencyFrom, currencyTo),
      sender: req.user._id,
      receiver: receiverUser._id,
      region: req.user.region,
    });

    await transaction.save();

    // Invalidate cache for both users
    await Promise.all([
      redisClient.del(getCacheKey(req.user)),
      redisClient.del(getCacheKey(receiverUser)),
    ]);

    // Create audit log
    await AuditLog.create({
      action: "transaction_create",
      userId: req.user._id,
      entityId: transaction._id,
      details: `Created transaction for ${amount} ${currencyFrom} to ${receiverUsername}`,
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error("Transaction creation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
async function getConversionRate(from, to) {
  // Implement your rate fetching logic here
  // This could be from an external API or your own service
  return 1.0; // Default rate
}
export const getTransactions = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const cacheKey = getCacheKey(req.user);
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    const query =
      req.user.region === "global" ? {} : { region: req.user.region };
    const transactions = await Transaction.find(query)
      .sort({ createdAt: -1 })
      .populate("sender receiver")
      .lean();

    await redisClient.setex(
      cacheKey,
      CACHE_EXPIRATION,
      JSON.stringify(transactions)
    );

    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};
