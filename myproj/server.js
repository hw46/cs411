const express = require('express');
const path = require('path');
const session = require('express-session');
const routes = require('./routes');

const app = express();
const PORT = 80;

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Configure session middleware
app.use(session({
    secret: 'your-secret-key',  // Change this to a secure random string
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set to true if using HTTPS
}));

// Middleware to make `user` available in all templates
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Use routes
app.use('/', routes);

app.listen(PORT, function () {
    console.log(`Node app is running on port ${PORT}`);
});
