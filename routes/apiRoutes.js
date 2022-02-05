const { createNewNote, filterById, deleteNote } = require("../lib/notes");
const router = require("express").Router();
const notes = require("../data/data.json");

router.get("/notes", (req, res) => {
  res.json(notes);
});
router.post("/notes", (req, res) => {
  const newNote = createNewNote(req.body, notes);
  res.json(newNote);
});
router.get("/notes/:id", (req, res) => {
  const result = filterById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
