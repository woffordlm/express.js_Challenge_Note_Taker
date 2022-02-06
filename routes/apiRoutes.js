
// functions required are stored in the lib
// router method is added to express
const { createNewNote, filterById} = require("../lib/notes");
const router = require("express").Router();
const notes = require("../data/data.json");

// api routes
router.get("/notes", (req, res) => {
  res.json(notes);
});
router.post("/notes", (req, res) => {
  const newNote = createNewNote(req.body, notes);
  notes.push(newNote)
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

// api routes are exported
module.exports = router;
