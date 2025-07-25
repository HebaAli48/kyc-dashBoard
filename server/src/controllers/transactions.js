import Transaction from "../models/Transaction.js";
import AuditLog from "../models/AuditLog.js";
import User from "../models/User.js";

export const createTransaction = async (req, res) => {
  try {
    const { amount, currencyFrom, currencyTo, receiverUsername } = req.body;

    // Validate required fields
    if (!amount || !currencyFrom || !currencyTo || !receiverUsername) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate amount is positive number
    if (isNaN(amount)) {
      return res.status(400).json({ error: "Amount must be a number" });
    }
    if (amount <= 0) {
      return res.status(400).json({ error: "Amount must be positive" });
    }

    // Validate currencies
    const validCurrencies = ["USD", "USDC"];
    if (!validCurrencies.includes(currencyFrom)) {
      return res.status(400).json({ error: "Invalid source currency" });
    }
    if (!validCurrencies.includes(currencyTo)) {
      return res.status(400).json({ error: "Invalid target currency" });
    }

    // Find receiver user
    const receiverUser = await User.findOne({ username: receiverUsername });
    // console.log("🚀 ~ createTransaction ~ receiverUser:", receiverUser);
    if (!receiverUser) {
      return res.status(404).json({ error: "Receiver not found" });
    }

    // Prevent sending to self
    if (receiverUser._id.equals(req.user._id)) {
      return res.status(400).json({ error: "Cannot send to yourself" });
    }

    // Get conversion rate
    const conversionRate = await getConversionRate(currencyFrom, currencyTo);
    if (!conversionRate) {
      return res.status(500).json({ error: "Failed to get conversion rate" });
    }

    // Create transaction
    const transaction = new Transaction({
      amount,
      currencyFrom,
      currencyTo,
      conversionRate,
      sender: req.user._id,
      receiver: receiverUser._id,
      region: req.user.region,
    });

    await transaction.save();
    // console.log("🚀 ~ createTransaction ~ transaction:", transaction);

    // Create audit log
    await AuditLog.create({
      action: "transaction_create",
      userId: req.user._id,
      entityId: transaction._id,
      entityType: "Transaction",
      details: `Created transaction for ${amount} ${currencyFrom} to ${receiverUsername}`,
    });

    res.status(201).json({
      _id: transaction._id,
      amount: transaction.amount,
      currencyFrom: transaction.currencyFrom,
      currencyTo: transaction.currencyTo,
      conversionRate: transaction.conversionRate,
      status: transaction.status,
      createdAt: transaction.createdAt,
    });
  } catch (error) {
    console.error("Transaction creation error:", error);
    res.status(500).json({
      error: "Internal server error",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

async function getConversionRate(from, to) {
  // Implement your rate fetching logic here
  // This could be from an external API or your own service
  return 1.0; // Default rate
}

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
