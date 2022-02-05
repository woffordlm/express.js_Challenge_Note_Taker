const fs = require('fs');
const path = require('path');
// functions called in routes is stored here
function deleteNote(id, notes) {
  for (let i = 0; i < notes.length; i++) {
    let noteItem = notes[i];
    if (noteItem.id === id) {
      notes.splice(i, 1);
      console.log("notes:", notes);
      fs.writeFileSync(
        path.join(__dirname, "../data/data.json"),
        JSON.stringify(notes, null, 2)
      );
      console.log(
        "JSON.stringify(notes, null, 2):",
        JSON.stringify(notes, null, 2)
      );
    }
  }
}
function createNewNote(body, notes) {
  console.log("notes", notes);
  const newNote = body;
  fs.readFile("./data/data.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log("data:", data);

      data = JSON.parse(data);
      console.log("data:", data);

      newNote.id = data.length.toString();
      notes = [...data, newNote];
      fs.writeFileSync(
        path.join(__dirname, "../data/data.json"),
        JSON.stringify(notes, null, 2)
      );
    }
  });
  return newNote;
}
function filterById(id, notesArray) {
  const result = notesArray.filter((notes) => notes.id === id)[0];

  return result;
}
// functions exported
module.exports = {
  deleteNote,
  createNewNote, 
  filterById
};