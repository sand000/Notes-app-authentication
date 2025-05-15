const { readUsers, writeUsers } = require("../helper");
const argon2 = require("argon2");
const { v4: uuidv4 } = require("uuid");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const users = readUsers();
    if (
      users.find((u) => {
        console.log("u", u, req.body);

        return u.email === email;
      })
    ) {
      return res.status(200).json({ message: "User already exists, Please login." });
    } else {
      const hashedPassword = await argon2.hash(password);
      console.log("hashed pass", hashedPassword);

      const newUser = {
        id: uuidv4(),
        username,
        email,
        password: hashedPassword,
      };

      console.log("new user", newUser);

      users.push(newUser);
      writeUsers(users);
      res.status(201).json({ message: "User created successfully", user: { username, email } });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
module.exports = signup;
