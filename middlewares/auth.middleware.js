const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startWith("Bearer")) {
      throw Error("Incalid token format");
    }

    const token = authHeader.split("")[1];
    if (!token) {
      throw Error("No token provided");
    }

    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    req.User = await User.findOne({ _id });

    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      res.status(401).json({ error: "Incalid token" });
    } else {
      res.status(401).json({ error: "Unauthorized access." });
    }
  }
};

module.exports = authMiddleware;
