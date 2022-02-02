// this tells the page that we are using express
const express = require('express');
const fs = require('fs');
const path = require('path');
// const apiRoutes = require('./routes/apiRoutes');
const PORT = process.env.PORT || 3002;
const notes = require('./data/data.json');
// this instantiates the server
const app = express();
// middleware
// parse incoming string or array data
// parse incoming JSON data

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function deleteNote (id, notes) {
  for (let i = 0; i < notes.length; i++) {
    let noteItem = notes[i];
    if (noteItem.id ===id) {
      notes.splice(i, 1)
      console.log('notes:', notes)
      fs.writeFileSync(
        path.join(__dirname, "./data/data.json"),
      JSON.stringify(notes, null, 2))
      console.log('JSON.stringify(notes, null, 2):', JSON.stringify(notes, null, 2))
      
    }  
  }
}
function createNewNote(body, notes) {
    console.log( notes)
    const newNote = body
    fs.readFile('./data/data.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log('data:', data)

        data = JSON.parse(data)
        console.log('data:', data)

        newNote.id = data.length.toString()
        notes = [ ...data, newNote ]
        fs.writeFileSync(
            path.join(__dirname, './data/data.json'),
            JSON.stringify(notes, null, 2)
        );
      }
    })
    return newNote
}
function filterById(id, notesArray){
  const result = notesArray.filter(notes=> 
    notes.id === id
  )[0];

  return result
}

app.delete ('/api/notes/:id', (req,res) =>{
  deleteNote(req.params.id, notes);
  res.json(true);    
} )
app.get('/api/notes',(req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
  console.log('notes:', notes)

    const newNote = createNewNote(req.body, notes);
    res.json(newNote)
})
app.get('/api/notes/:id', (req,res) =>{
  const result = filterById(req.params.id, notes);
    if(result){
      res.json(result);
    } else {
      res.sendStatus(404)
    }
} )
app.get ('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
})
app.get ('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get ('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html' ))
})






app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});