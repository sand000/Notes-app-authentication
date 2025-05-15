const argon2 = require("argon2");
const { readUsers } = require("../helper");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const jwt = require("jsonwebtoken");

const generateToken = ({ username, id, email }) => {
  console.log("generated token", username, id, email);
  const token = jwt.sign({ username, id, email }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = readUsers();
    const matchedUser = users.find((u) => u.username === username);

    const verifyPassword = await argon2.verify(matchedUser.password, password);
    console.log("verifyPassword in login", verifyPassword);

    if (!verifyPassword) return res.json({ message: "Either password or username is incorrect." });
    const generatedToken = generateToken({
      username,
      id: matchedUser.id,
      email: matchedUser.email,
    });
    return res.status(201).json({ message: "Token created successfully", token: generatedToken });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = login;
