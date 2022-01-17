const expressAsyncHandler = require("express-async-handler");
const note = require("../models/noteModel");

const getNotes = expressAsyncHandler(async (req, res) => {
  const notes = await note.find();
  res.json(notes);
});

module.exports = { getNotes };
