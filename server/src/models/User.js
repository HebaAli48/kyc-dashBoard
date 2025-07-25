import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [
        "global_admin",
        "regional_admin",
        "sending_partner",
        "receiving_partner",
      ],
      required: true,
    },
    region: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
