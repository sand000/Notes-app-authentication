const express = require("express");
const app = express();
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteroutes");
const fs = require("fs");
const cors = require("cors");
const USERS_DATA = require("./config/users.json");
const authenticateMiddleware = require("./middlewares/authenticateMiddleware");

const PORT = process.env.PORT;
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://animated-clafoutis-a8c97f.netlify.app/"],
  }),
);

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

app.get("/", authenticateMiddleware, (req, res) => {
  res.send("asda");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
