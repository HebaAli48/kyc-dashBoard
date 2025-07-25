import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuditLog from "../models/AuditLog.js";

export const register = async (req, res) => {
  try {
    const { username, password, role, region } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      role,
      region,
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, role: user.role, region: user.region },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ error: "username or password is wrong , plz try again" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ error: "username or password is wrong , plz try again" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        region: user.region,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Return user data without password
    const userData = user.toObject();
    // console.log("🚀 ~ login ~ userData:", userData);
    delete userData.password;
    await AuditLog.create({
      action: "login",
      userId: userData._id,
      details: `user ${user.username} logged in `,
    });
    res.status(200).json({
      token,
      user: userData,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    // The auth middleware should have already verified the token and set req.user
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const user = await User.findById(req.user.userId)
      .select("-password -__v")
      .lean();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error in getMe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user statistics for charts
export const getUserStats = async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          roles: { $push: { role: "$_id", count: "$count" } },
          total: { $sum: "$count" },
        },
      },
      {
        $project: {
          _id: 0,
          roles: 1,
          total: 1,
        },
      },
    ]);

    const regionStats = await User.aggregate([
      {
        $group: {
          _id: "$region",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          region: "$_id",
          count: 1,
        },
      },
    ]);

    res.status(200).json({
      roleDistribution: stats[0]?.roles || [],
      regionDistribution: regionStats,
      totalUsers: stats[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
