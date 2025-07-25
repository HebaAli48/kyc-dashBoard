import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    action: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    details: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for user population
auditLogSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

// Auto-populate user virtual
const autoPopulateUser = function (next) {
  this.populate("user");
  next();
};

auditLogSchema
  .pre("find", autoPopulateUser)
  .pre("findOne", autoPopulateUser)
  .pre("findOneAndUpdate", autoPopulateUser);

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

export default AuditLog;
