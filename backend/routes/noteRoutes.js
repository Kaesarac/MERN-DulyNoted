const express = require("express");
const {
  getNotes,
  CreateNote,
  getNoteById,
  UpdateNote,
  DeleteNote,
} = require("../controllers/notesController");
const Protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(Protect, getNotes);
router.route("/create").post(Protect, CreateNote);
router
  .route("/:id")
  .get(getNoteById)
  .put(Protect, UpdateNote)
  .delete(Protect, DeleteNote);

module.exports = router;
