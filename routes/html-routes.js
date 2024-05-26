// Importing necessary modules
const router = require('express').Router();
const path = require('path');

// Defines the route that sends 'index.html' as a response to a client when a GET request is made to the root URL
router.get('/', (req, res) => {
  // Sends the 'index.html' file from the 'public' directory
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Defines the route that sends 'notes.html' as a response to a client when a GET request is made to the '/notes' URL
router.get('/notes', (req, res) => {
  // Sends the 'notes.html' file from the 'public' directory
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// Export the router so it can be used in other parts of the application
module.exports = router;
