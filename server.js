const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const port = 3000;

// configuring mustache
app.engine('mustache', mustacheExpress(__dirname + '/views/partials', '.mustache'));
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// Add Mustache helper functions
app.use((req, res, next) => {
    res.locals.equals = function(a, b) {
        return a === b;
    };
    next();
});

// static files
app.use(express.static('public'));
app.use(express.static('css'));
app.use(express.static('img'));
app.use(express.urlencoded({ extended: true}));

// all routes
const bookController = require('./controllers/bookController');

// Read operations
app.get('/', bookController.home);
app.get('/books', bookController.home); // Support both / and /books for home

// Create operations
app.get('/add', bookController.addForm);
app.post('/add', bookController.addBook);

// Update operations
app.get('/edit/:id', bookController.editForm);
app.post('/update/:id', bookController.updateBook);

// Delete operations
app.get('/delete/:id', bookController.deleteBook);
app.post('/bulk-delete', bookController.bulkDelete);

// starting server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});