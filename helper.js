const fs = require("fs");
const path = require("path");

// Absolute path to the JSON file
const USERS_DATA = path.join(__dirname, "config", "users.json");
const NOTES_DATA = path.join(__dirname, "config", "notes.json");

function readUsers() {
  // Check if the file exists
  if (!fs.existsSync(USERS_DATA)) {
    // If not, create directory if needed and initialize with empty array
    fs.mkdirSync(path.dirname(USERS_DATA), { recursive: true });
    fs.writeFileSync(USERS_DATA, JSON.stringify([], null, 2), "utf-8");
  }

  // Read the file content
  const data = fs.readFileSync(USERS_DATA, "utf-8");
  return JSON.parse(data);
}

function writeUsers(users) {
  fs.writeFileSync(USERS_DATA, JSON.stringify(users, null, 2), "utf-8");
}

function readNotes() {
  if (!fs.existsSync(NOTES_DATA)) {
    fs.mkdirSync(path.dirname(NOTES_DATA), { recursive: true });
    fs.writeFileSync(NOTES_DATA, JSON.stringify([], null, 2), "utf-8");
  }

  const data = fs.readFileSync(NOTES_DATA, "utf-8");
  return JSON.parse(data);
}

function writeNotes(notes) {
  fs.writeFileSync(NOTES_DATA, JSON.stringify(notes, null, 2), "utf-8");
}

module.exports = { readUsers, writeUsers, readNotes, writeNotes };
