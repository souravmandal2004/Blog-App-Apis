const express = require ("express");
const app = express ();
require ("dotenv").config ();
const blogRoutes = require ("./routes/blogRoutes.route.js");
const dbConnect = require ("./config/database.js");

const PORT = process.env.PORT || 4000;

// middleware
app.use (express.json ());

// Mounting the routes
app.use ("/api/v1", blogRoutes);

// start the server
app.listen (PORT, () => {
    console.log (`Server is running on port ${PORT}`);
});

// connect to the db
dbConnect ();

// Default route
app.get ("/", (req, res) => {
    res.send (`<h1> This is the ultimate Home Page`);
});
