const expressAsyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");
const mongoose = require("mongoose");
const res = require("express/lib/response");

const getNotes = expressAsyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  return res.json(notes);
});

const CreateNote = expressAsyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error(
      "Please fill both the Title and Content in order to Duly Note something."
    );
  } else {
    const note = new Note({
      user: req.user.id,
      title,
      content,
      category,
    });
    const createdNote = await note.save();
    res.status(201).json(createdNote);
  }
});

const getNoteById = expressAsyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not Found" });
  }
});

const UpdateNote = expressAsyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user.id.toString()) {
    throw new Error("You are not authorized to perform this action.");
  }

  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

const DeleteNote = expressAsyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user.id.toString()) {
    throw new Error("You are not authorized to perform this action.");
  }

  if (note) {
    await note.remove();
    res.json({ message: "Note Removed" });
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

module.exports = { getNotes, CreateNote, getNoteById, UpdateNote, DeleteNote };
