// // Import required modules
// const express = require('express');
// const html_routes = require('./routes/html-routes')
// const api_routes = require('./routes/ApiRoutes/api-routes')

// // Set the port dynamically or default to 3000
// const PORT = process.env.PORT || 3001;

// // Create an instance of Express
// const app = express();

// //Middeware setup
// //Parse URL-encoded and JSON data
// app.use(express.urlencoded({ extended : true }));
// app.use(express.json());

// // Serve static files from the "public" directory
// app.use(express.static("public"));

// // Use HTML routes defined in html-routes file
// app.use(html_routes)

// // Use API routes defined in api-routes file
// app.use(api_routes)

// //Start the server and listen on the specified port
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require('express');
const path = require('path');
const html_routes = require('./routes/html-routes')
const api_routes = require('./routes/api-routes')
const PORT = process.env.PORT || 3001;
// dynamically set the port
const app = express();

// Express middleware will always run the operation in the order from top to bottom "order matters"
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const publicPath = 'C:/Users/Edwin/bootcamp/homework/Note-Taker/public';
app.use(express.static(publicPath));

// app.use(express.static(path.join(__dirname, 'public')));
app.use(html_routes)
app.use(api_routes)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});