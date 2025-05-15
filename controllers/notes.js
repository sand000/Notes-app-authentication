const { readNotes, writeNotes } = require("../helper");
const { v4: uuidv4 } = require("uuid");

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const id = req.user?.id;
    if (!title || !content) {
      return res.status(404).json({ message: "Title and Content is required" });
    } else {
      const notes = readNotes();
      const newNote = {
        id: uuidv4(),
        title,
        content,
        userId: id,
        createdAt: new Date(),
      };
      notes.push(newNote);
      writeNotes(notes);
      return res.status(201).json({ message: "New note is created successfully" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error in creating note" });
  }
};

const getAllNotes = (req, res) => {
  try {
    const id = req.user?.id;
    const notes = readNotes();
    if (notes) {
      const allNotes = notes.filter((n) => n.userId === id);
      if (!allNotes) return res.status(200).json({ message: "No notes found" });
      return res.status(200).json({ message: "Notes fetched successfully", notes: allNotes });
    } else {
      return res.status(500).json({ error: "Error in fetching note" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error in fetching note" });
  }
};

const deletNoteById = (req, res) => {
  try {
    const { id } = req.params;
    const notes = readNotes();
    const filterNotes = notes.some((n) => n.id == id);
    if (!filterNotes) return res.status(404).json({ message: "No notes found" });

    const filteredData = notes.filter((n) => n.id !== id);
    writeNotes(filteredData);
    res.status(200).json({ message: "Note deleted successflly" });
  } catch (error) {
    return res.status(500).json({ error: "Error deleting note" });
  }
};

module.exports = { getAllNotes, createNote, deletNoteById };
