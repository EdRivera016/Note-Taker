// Import the express router
const router = require('express').Router();

// Import the UUID library to generate unique IDs
const { v4: uuidv4 } = require('uuid');

// Import the file system module to read and write files
const fs = require('fs');

// Define the GET request for the endpoint '/api/notes'
// This endpoint retrieves all notes from the database
router.get('/api/notes', async (req, res) => {
  // Read and parse the contents of the db.json file
  const dbJson = await JSON.parse(fs.readFileSync("db/db.json", "utf8"));
  // Send the parsed JSON data as the response
  res.json(dbJson);
});

// Define the POST request for the endpoint '/api/notes'
// This endpoint adds a new note to the database
router.post('/api/notes', (req, res) => {
  // Read and parse the existing notes from the db.json file
  const dbJson = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
  
  // Create a new note object with a unique ID
  const newFeedback = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };

  // Add the new note to the array of existing notes
  dbJson.push(newFeedback);

  // Write the updated array of notes back to the db.json file
  fs.writeFileSync("db/db.json", JSON.stringify(dbJson));

  // Send the updated array of notes as the response
  res.json(dbJson);
});

// Define the DELETE request for the endpoint '/api/notes/:id'
// This endpoint deletes a note by its ID
router.delete('/api/notes/:id', (req, res) => {
  // Read the contents of the db.json file
  let data = fs.readFileSync("db/db.json", "utf8");

  // Parse the JSON data
  const dataJSON = JSON.parse(data);

  // Filter out the note with the ID specified in the request parameters
  const newNotes = dataJSON.filter((note) => {
    return note.id !== req.params.id;
  });

  // Write the updated array of notes back to the db.json file
  fs.writeFileSync("db/db.json", JSON.stringify(newNotes));

  // Send a response indicating the note was deleted
  res.json("Note deleted.");
});

// Export the router so it can be used in other parts of the application
module.exports = router;
