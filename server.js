const express = require('express'); // Importing the Express framework
const path = require('path'); // Importing the path module to work with file and directory paths
const html_routes = require('./routes/html-routes'); // Importing HTML routes
const api_routes = require('./routes/api-routes'); // Importing API routes
const PORT = process.env.PORT || 3001; // Setting the port to an environment variable or defaulting to 3001

const app = express(); // Initializing the Express application

// Middleware to parse URL-encoded data and JSON data from incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware to serve static files from the 'assets' directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Route to serve the 'index.html' file from the root directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to serve the 'notes.html' file from the root directory
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
});

// Middleware to use the imported routes
app.use(html_routes);
app.use(api_routes);

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
