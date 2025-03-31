# Book Collection Manager

A web application for managing your personal book collection. Built with Node.js, Express, SQLite, and Mustache.

## Features

- Add, edit, and delete books
- Filter books by genre
- Sort books by title, author, or rating
- Search books by title or author
- Bulk delete books by genre
- Form validation
- Responsive design for mobile devices
- Modern UI with icons and intuitive layout

## Technology Stack

- **Backend**: Node.js with Express
- **Database**: SQLite3
- **Template Engine**: Mustache
- **Frontend**: HTML, CSS, Font Awesome icons
- **Architecture**: MVC pattern

## Requirements

- Node.js (v12 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```
4. Open http://localhost:3000 in your browser

## Database Schema

The application uses a SQLite database with the following schema:

```sql
CREATE TABLE books (
    rowid INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    genre TEXT,
    rating REAL,
    status TEXT,
    publish_year INTEGER
);
```

## Form Validation

- Title: Must be at least 3 characters long
- Rating: Must be between 0 and 5
- Required fields: Title, Author, Genre, Rating, Status

## Responsive Design

The application is fully responsive with the following features:
- Multi-column layout on desktop
- Single-column layout on mobile
- Hidden less important columns on mobile
- Increased touch targets for mobile
- Icons instead of text buttons on mobile
- Responsive forms and filters
