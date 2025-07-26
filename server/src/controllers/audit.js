import AuditLog from "../models/AuditLog.js";

export const getAuditLogs = async (req, res) => {
  try {
    // First get all logs if global, or filter by user region if not
    let logs;
    if (req.user.region === "global") {
      logs = await AuditLog.find()
        .sort({ createdAt: -1 })
        .populate("userId", "region") // Populate user's region
        .lean();
    } else {
      // Find logs where the associated user has matching region
      logs = await AuditLog.aggregate([
        {
          $lookup: {
            from: "users", // The collection name for User model
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" }, // Convert user array to object
        { $match: { "user.region": req.user.region } }, // Filter by region
        { $sort: { createdAt: -1 } },
        { $project: { user: 0 } }, // Exclude full user object from results
      ]);
    }

    res.json(logs);
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    res.status(500).json({
      error: "Failed to fetch audit logs",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
