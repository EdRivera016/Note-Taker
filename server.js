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