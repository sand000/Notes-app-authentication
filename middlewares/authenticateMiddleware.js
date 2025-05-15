const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const jwt = require("jsonwebtoken");

const authenticateMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).send({ message: "Missing token" });
    const verifiedUser = jwt.verify(token, JWT_SECRET_KEY);
    req.user = verifiedUser;
    next();
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: error.message });
  }
};
module.exports = authenticateMiddleware;
