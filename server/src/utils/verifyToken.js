const AppError = require("./AppError");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// verify req have token and based on token asingn the user to the req
const verifyToken = async (req, res, next) => {
  // checking if there is a token provided
  const token = req.headers.authorization;
  // console.log("token", token);
  // console.log("header", req.headers.authorization);
  // console.log("body", req.body);
  if (!token)
    return next(new AppError("No token provided, Access Denied!", 401));

  // destructuring id from the payload
  const { id } = jwt.verify(token, process.env.ENCRYPTION_KEY);
  // console.log("id", id);
  // logged in user
  const user = await User.findById(id);

  // console.log("user", user);
  if (!user) return next(new AppError("User Not Found!", 404)); // This check is not necessary

  req.user = user;
  // console.log("in verifytoken");
  next();
};

module.exports = verifyToken;
