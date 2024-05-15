// const router = require('express').Router();
// const{ v4: uuidv4 } = require('uuid');
// const fs = require("fs");

// router.get('/api/notes', async (req, res) => {
//     const dbJson = await JSON.parse(fs.readFileSync("db/db.json", "utf8"));
//     res.json(dbJson);
// });

// router.post('/api/notes', (req, res) => {
//     const dbJson = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
//     const newFeedback = {
//         title: req.body.title,
//         text: req.body.text,
//         id: uuidv4(),
//     };
//     dbJson.push(newFeedback);
//     fs.writeFileSync("db/db.json", JSON.stringify(dbJson));
//     res.json(dbJson);
// });

// router.delete('/api/notes/:id', (req, res) => {
//     let data = fs.readFileSync("db/db.json", "utf8");
//     const dataJSON = JSON.parse(data);
//     const newNotes = dataJSON.filter((note) => {
//         return note.id !== req.params.id;
//     });
//     fs.writeFileSync("db/db.json", JSON.stringify(newNotes));
//     res.join("Note Deleted.");
// });
// module.exports = router;

// dependencies
const express = require("express");
const router = express.Router();
// creates a random id
const uuid = require("uuid");
// brings in the DB class object
const DB = require("../db/DB");

// route to get notes
router.get("/api/notes", async function (req, res) {
  const notes = await DB.readNotes();
  return res.json(notes);
});

// route to add a new note and add it to the json file
router.post("/api/notes", async function (req, res) {
  const currentNotes = await DB.readNotes();
  let newNote = {
    id: uuid(),
    title: req.body.title,
    text: req.body.text,
  };

  await DB.addNote([...currentNotes, newNote]);

  return res.send(newNote);
});

// // route to delete notes
router.delete("/api/notes/:id", async function (req, res) {
  // separates out the note to delete based on id
  const noteToDelete = req.params.id;
  // notes already in json file
  const currentNotes = await DB.readNotes();
  // sort through notes file and create a new array minus the note in question
  const newNoteData = currentNotes.filter((note) => note.id !== noteToDelete);

  // sends the new array back the DB class 
  await DB.deleteNote(newNoteData);
  
  return res.send(newNoteData);
});

module.exports = router;