// Import required modules
const express = require('express');
const html_routes = require('./routes/html-routes')
const api_routes = ('./routes/api-routes')

// Set the port dynamically or default to 3000
const PORT = process.env.PORT || 3000;

// Create an instance of Express
const app = express();

//Middeware setup
//Parse URL-encoded and JSON data
app.use(express.urlencoded({ extended : false }));
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static("public"));

// Use HTML routes defined in html-routes file
app.use(html_routes)

// Use API routes defined in api-routes file
app.use(api_routes)

//Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running on Http://localhost:${PORT}`);
});