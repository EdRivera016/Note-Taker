// const express = require('express');
// const path = require('path');
// const apiRoutes = require('./routes/api-routes');
// const htmlRoutes = require('./routes/html-routes');

// const app = express();
// const PORT = process.env.PORT || 3001;

// // Middleware for parsing JSON and urlencoded form data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

// // Use API and HTML routes
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


// const express = require('express');
// const path = require('path');
// const html_routes = require('./routes/html-routes')
// const api_routes = require('./routes/api-routes')
// const PORT = process.env.PORT || 3001;
// // dynamically set the port
// const app = express();

// // Express middleware will always run the operation in the order from top to bottom "order matters"
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// const publicPath = 'C:/Users/Edwin/bootcamp/homework/Note-Taker/';
// app.use(express.static(publicPath));

// // app.use(express.static(path.join(__dirname, 'public')));
// app.use(html_routes)
// app.use(api_routes)

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require('express');
const path = require('path');
const html_routes = require('./routes/html-routes');
const api_routes = require('./routes/api-routes');
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware to parse request bodies and serve static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'assets' directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Serve index.html from the root directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve notes.html from the root directory
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
});

// Use routes
app.use(html_routes);
app.use(api_routes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
