
// router method is added to express
// path method is called forth 
const path = require('path');
const router = require('express').Router();

// html routes
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("*", (req, res) => {
  console.log('__dirname:', __dirname)

  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// routes exported
module.exports = router