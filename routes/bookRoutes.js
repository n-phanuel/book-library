// routes/bookRoutes.js
// Declares all /books endpoints and attaches validation middleware.

const express = require("express");
const router  = express.Router();

const { getBooks, getBook, addBook, editBook, removeBook } =
  require("../controllers/bookController");
const { validateBook, validatePartialBook } = require("../middleware/validate");

// Collection routes
router.route("/")
  .get(getBooks)                // GET  /books
  .post(validateBook, addBook); // POST /books  (requires full validation)

// Single-resource routes
router.route("/:id")
  .get(getBook)                        // GET    /books/:id
  .put(validatePartialBook, editBook)  // PUT    /books/:id  (partial ok)
  .delete(removeBook);                 // DELETE /books/:id

module.exports = router;