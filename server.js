const express = require('express');
const mustache = require('mustache-express');
const app = express();
const port = 3000;

// configuring mustache
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');


// static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));


// all routes
const bookController = require('./controllers/bookController');
app.get('/', bookController.home);
app.get('/add', bookController.addForm);
app.post('/add', bookController.addBook);
app.get('/edit/:id', bookController.editForm);
app.post('/update/:id', bookController.updateBook);
app.get('/delete/:id', bookController.deleteBook);


// starting server
app.listen(port, () => {
    console.log('Server running at http://localhost:${port}');
})