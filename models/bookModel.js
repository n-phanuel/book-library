// models/bookModel.js
// In-memory data store for books.

const { v4: uuidv4 } = require("uuid");

// Seed data
let books = [
  { id: uuidv4(), title: "The Great Gatsby",      author: "F. Scott Fitzgerald", year: 1925, genre: "Fiction",         createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: uuidv4(), title: "To Kill a Mockingbird", author: "Harper Lee",           year: 1960, genre: "Fiction",         createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: uuidv4(), title: "1984",                  author: "George Orwell",        year: 1949, genre: "Dystopian",       createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: uuidv4(), title: "Dune",                  author: "Frank Herbert",        year: 1965, genre: "Science Fiction", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

// Return all books, optionally filtered by author, genre, or year
const getAllBooks = ({ author, genre, year } = {}) => {
  let result = [...books];
  if (author) result = result.filter((b) => b.author.toLowerCase().includes(author.toLowerCase()));
  if (genre)  result = result.filter((b) => b.genre.toLowerCase().includes(genre.toLowerCase()));
  if (year)   result = result.filter((b) => b.year === Number(year));
  return result;
};

// Find one book by UUID
const getBookById = (id) => books.find((b) => b.id === id) ?? null;

// Create and persist a new book
const createBook = ({ title, author, year, genre }) => {
  const now  = new Date().toISOString();
  const book = { id: uuidv4(), title: title.trim(), author: author.trim(), year: Number(year), genre: genre.trim(), createdAt: now, updatedAt: now };
  books.push(book);
  return book;
};

// Partially update an existing book; returns null if not found
const updateBook = (id, fields) => {
  const idx = books.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  books[idx] = {
    ...books[idx], ...fields,
    ...(fields.year !== undefined && { year: Number(fields.year) }),
    id,
    createdAt: books[idx].createdAt,
    updatedAt: new Date().toISOString(),
  };
  return books[idx];
};

// Delete a book; returns true if deleted, false if not found
const deleteBook = (id) => {
  const idx = books.findIndex((b) => b.id === id);
  if (idx === -1) return false;
  books.splice(idx, 1);
  return true;
};

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };