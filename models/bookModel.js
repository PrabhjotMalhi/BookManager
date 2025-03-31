const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/books.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS books (
            rowid INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL, 
            author TEXT NOT NULL, 
            genre TEXT,
            rating REAL,
            status TEXT,
            publish_year INTEGER
        )
    `);
});



const getAllBooks = (callback) => {
    db.all('SELECT * FROM books', callback);
};

const addBook = (book, callback) => {
    db.run(
        'INSERT INTO BOOKS (title, author, genre, rating, status, publish_year) VALUES (?, ?, ?, ?, ?, ?)',
        [book.title, book.author, book.genre, book.rating, book.status, book.publish_year],
        callback
    );
};

const updateBook = (id, book, callback) => {
    db.run(
        'UPDATE books SET title=?, author=?, genre=?, rating=?, status=?, publish_year=? WHERE rowid=?',
        [book.title, book.author, book.genre, book.rating, book.status, book.publish_year, id],
        callback
    );
};

const deleteBook = (id, callback) => {
    db.run('DELETE FROM books WHERE rowid=?', [id], callback);
};

const getBooksByGenre = (genre, callback) => {
    db.all('SELECT * FROM books WHERE genre = ?', [genre], callback);
};

const getSortedBooks = (sortBy, callback) => {
    const validColumns = ['title', 'author', 'rating'];
    const column = validColumns.includes(sortBy) ? sortBy : 'title';
    db.all(`SELECT * FROM books ORDER BY ${column}`, callback);
};

const searchBooks = (query, callback) => {
    const searchQuery = `%${query}%`;
    db.all(
        'SELECT * FROM books WHERE title LIKE ? OR author LIKE ?',
        [searchQuery, searchQuery],
        callback
    );
};

const bulkDeleteByGenre = (genre, callback) => {
    db.run('DELETE FROM books WHERE genre = ?', [genre], callback);
};

module.exports = {
    getAllBooks,
    addBook,
    updateBook,
    deleteBook,
    getBooksByGenre,
    getSortedBooks,
    searchBooks,
    bulkDeleteByGenre
};