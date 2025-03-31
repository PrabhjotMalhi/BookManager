const model = require('../models/bookModel');

const home = (req, res) => {
  const { genre, sort, search } = req.query;

  if (search) {
    model.searchBooks(search, (err, books) => {
      if (err) return res.send('Database error');
      res.render('home', { layout: 'layout', books, search });
    });
  } else if (genre) {
    model.getBooksByGenre(genre, (err, books) => {
      if (err) return res.send('Database error');
      res.render('home', { layout: 'layout', books, selectedGenre: genre });
    });
  } else if (sort) {
    model.getSortedBooks(sort, (err, books) => {
      if (err) return res.send('Database error');
      res.render('home', { layout: 'layout', books, sortBy: sort });
    });
  } else {
    model.getAllBooks((err, books) => {
      if (err) return res.send('Database error');
      // Get unique genres for filter dropdown
      const genres = [...new Set(books.map(book => book.genre))];
      res.render('home', { layout: 'layout', books, genres });
    });
  }
};

const addForm = (req, res) => {
  res.render('add', { layout: 'layout' });
};

const addBook = (req, res) => {
  const { title, author, genre, rating, status, publish_year } = req.body;
  
  // Book Validation
  if (!title || title.length < 3) {
    return res.render('add', { layout: 'layout', error: 'Title must be ≥3 characters!', ...req.body });
  }
  if (rating < 0 || rating > 5) {
    return res.render('add', { layout: 'layout', error: 'Rating must be 0-5!', ...req.body });
  }

  model.addBook(req.body, (err) => {
    if (err) return res.send('Error adding book');
    res.redirect('/');
  });
};

const editForm = (req, res) => {
  const id = req.params.id;
  model.getAllBooks((err, books) => {
    const book = books.find(b => b.rowid == id);
    res.render('edit', { layout: 'layout', book });
  });
};

const updateBook = (req, res) => {
  const id = req.params.id;
  model.updateBook(id, req.body, (err) => {
    if (err) return res.send('Error updating book');
    res.redirect('/');
  });
};

const deleteBook = (req, res) => {
  const id = req.params.id;
  model.deleteBook(id, (err) => {
    if (err) return res.send('Error deleting book');
    res.redirect('/');
  });
};

const bulkDelete = (req, res) => {
  const { genre } = req.body;
  if (!genre) {
    return res.redirect('/');
  }
  
  model.bulkDeleteByGenre(genre, (err) => {
    if (err) return res.send('Error deleting books');
    res.redirect('/');
  });
};

module.exports = {
    home,
    addForm,
    addBook,
    editForm,
    updateBook,
    deleteBook,
    bulkDelete
};