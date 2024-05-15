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



//require dependencies
const express = require('express');

//create express app
const app = express();

//create a PORT variable
const PORT = process.env.PORT || 3000;

//set up express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const apiRoutes = require("./routes/apiRoutes");
app.use(apiRoutes);
const htmlRoutes = require("./routes/htmlRoutes");
app.use(htmlRoutes);

//create server listener
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));