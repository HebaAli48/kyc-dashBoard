import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    currencyFrom: { type: String, default: "USD" },
    currencyTo: { type: String, default: "USDC" },
    conversionRate: { type: Number, required: true },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    region: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Middleware to auto-populate sender and receiver
const autoPopulateSenderReceiver = function (next) {
  this.populate("sender receiver");
  next();
};

transactionSchema
  .pre("find", autoPopulateSenderReceiver)
  .pre("findOne", autoPopulateSenderReceiver);

export default mongoose.model("Transaction", transactionSchema);
