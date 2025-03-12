const model = require('../models/bookModel');

const home = (req, res) => {
  model.getAllBooks((err, books) => {
    if (err) return res.send('Database error');
    res.render('home', { books });
  });
};

const addForm = (req, res) => {
  res.render('add');
};

const addBook = (req, res) => {
  const { title, author, genre, rating, status, publish_year } = req.body;
  
  // Book Validation
  if (!title || title.length < 3) {
    return res.render('add', { error: 'Title must be ≥3 characters!', ...req.body });
  }
  if (rating < 0 || rating > 5) {
    return res.render('add', { error: 'Rating must be 0-5!', ...req.body });
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
    res.render('edit', { book });
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

module.exports = { home, addForm, addBook, editForm, updateBook, deleteBook };