const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

// Function to read notes from the db.json file
const readNotes = () => {
  const data = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8');
  return JSON.parse(data);
};

// Function to write notes to the db.json file
const writeNotes = (notes) => {
  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 2));
};

// GET request to retrieve notes
router.get('/notes', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// POST request to add a new note
router.post('/notes', (req, res) => {
  const notes = readNotes();
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  notes.push(newNote);
  writeNotes(notes);
  res.json(newNote);
});

// DELETE request to delete a note
router.delete('/notes/:id', (req, res) => {
  let notes = readNotes();
  notes = notes.filter(note => note.id !== req.params.id);
  writeNotes(notes);
  res.json({ message: 'Note deleted successfully' });
});

module.exports = router;

// const router = require('express').Router();
// const { v4: uuidv4 } = require('uuid');
// const fs = require ("fs");

// // Defines the get request to this routes end point '/api/notes'
// router.get('/api/notes', async (req, res) => {
//   const dbJson = await JSON.parse(fs.readFileSync("db/db.json","utf8"));
//   res.json(dbJson);
// });

// // Defines the post request to this routes end point '/api/notes'
// router.post('/api/notes', (req, res) => {
//   const dbJson = JSON.parse(fs.readFileSync("db/db.json","utf8"));
//   const newFeedback = {
//     title: req.body.title,
//     text: req.body.text,
//     id: uuidv4(),
//   };
//   dbJson.push(newFeedback);
//   fs.writeFileSync("db/db.json",JSON.stringify(dbJson));
//   res.json(dbJson);
// });

// // Defines the delete request to this routes end point '/api/notes/:id'
// // Hello there, and welcome visitor - upon viewing this code you'll understand that for legacy purposes... 
// // this is where the trials and tribulations begin with routing... please ensure to that if you follow the...
// // the same methodology and approach with uuidv4 ... you must enter "npm i uuid@3.4.0" in the Command Line of your Terminal...
// router.delete('/api/notes/:id', (req, res) => {
//   let data = fs.readFileSync("db/db.json", "utf8");
//   const dataJSON =  JSON.parse(data);
//   const newNotes = dataJSON.filter((note) => { 
//     return note.id !== req.params.id;
//   });
//   fs.writeFileSync("db/db.json",JSON.stringify(newNotes));
//   res.json("Note deleted.");
// });

// module.exports = router; 