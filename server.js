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


function createNewNote(body, notesArray) {
    const newNote = body
    console.log('newNote:', newNote)
    notes.push(newNote)
    fs.writeFileSync(
        path.join(__dirname, './data/data.json'),
        JSON.stringify({ notes }, null, 2)
      );
    return newNote

}



// api routes
app.get('/api/notes',(req, res) => {
    res.json(notes);
  });
app.post('/api/notes', (req, res) => {
    // setting id
    console.log('notes.length:', notes.length)
    console.log('notes:', notes)

    req.body.id = notes.length.toString()
    
    // adding note to json file and notes array
    const newNote = createNewNote(req.body, notes);
    res.json(newNote)
})

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});














// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static('public'));


// Use apiRoutes
// app.use('/api', apiRoutes);