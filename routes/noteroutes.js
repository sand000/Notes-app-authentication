const express = require("express");
const { getAllNotes, createNote, deletNoteById } = require("../controllers/notes");
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");
const router = express.Router();

router.get("/", authenticateMiddleware, getAllNotes);
router.post("/", authenticateMiddleware, createNote);
router.delete("/:id", authenticateMiddleware, deletNoteById);


module.exports = router;
