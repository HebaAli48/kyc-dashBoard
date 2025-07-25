import Transaction from "../models/Transaction.js";
import AuditLog from "../models/AuditLog.js";

export const createTransaction = async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();

    // Log to audit
    await AuditLog.create({
      action: "transaction_create",
      userId: req.user?.userId,
      details: `Created transaction ${transaction._id}`,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
