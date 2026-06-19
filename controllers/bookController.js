// controllers/bookController.js
// Business logic for every endpoint. Routes stay thin.

const { getAllBooks, getBookById, createBook, updateBook, deleteBook } =
  require("../models/bookModel");

// GET /books  —  list all books, supports ?author, ?genre, ?year filters
const getBooks = (req, res, next) => {
  try {
    const { author, genre, year } = req.query;
    const books = getAllBooks({ author, genre, year });
    res.status(200).json({ success: true, count: books.length, data: books });
  } catch (err) { next(err); }
};

// GET /books/:id  —  get one book by UUID
const getBook = (req, res, next) => {
  try {
    const book = getBookById(req.params.id);
    if (!book)
      return res.status(404).json({ success: false, message: `Book '${req.params.id}' not found.` });
    res.status(200).json({ success: true, data: book });
  } catch (err) { next(err); }
};

// POST /books  —  create a new book
const addBook = (req, res, next) => {
  try {
    const book = createBook(req.body);
    res.status(201).json({ success: true, message: "Book created successfully.", data: book });
  } catch (err) { next(err); }
};

// PUT /books/:id  —  update an existing book
const editBook = (req, res, next) => {
  try {
    const updated = updateBook(req.params.id, req.body);
    if (!updated)
      return res.status(404).json({ success: false, message: `Book '${req.params.id}' not found.` });
    res.status(200).json({ success: true, message: "Book updated successfully.", data: updated });
  } catch (err) { next(err); }
};

// DELETE /books/:id  —  remove a book
const removeBook = (req, res, next) => {
  try {
    const deleted = deleteBook(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: `Book '${req.params.id}' not found.` });
    res.status(200).json({ success: true, message: "Book deleted successfully." });
  } catch (err) { next(err); }
};

module.exports = { getBooks, getBook, addBook, editBook, removeBook };