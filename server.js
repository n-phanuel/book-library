// server.js
// Entry point — registers middleware, mounts routes, starts the HTTP server.

const express      = require("express");
const bookRoutes   = require("./routes/bookRoutes");
const errorHandler = require("./middleware/errorHandler");

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Global Middleware ──────────────────────────────────────────────────────────
app.use(express.json());   // Parse incoming JSON bodies

app.use((req, _res, next) => {   // Simple request logger
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ── Routes ─────────────────────────────────────────────────────────────────────
// Health / welcome endpoint
app.get("/", (_req, res) => {
  res.json({
    message: "Book Library API is running!",
    version: "1.0.0",
    endpoints: {
      "GET    /books":     "List all books (filter: ?author, ?genre, ?year)",
      "GET    /books/:id": "Get a single book by ID",
      "POST   /books":     "Create a new book",
      "PUT    /books/:id": "Update an existing book",
      "DELETE /books/:id": "Delete a book",
    },
  });
});

app.use("/books", bookRoutes);  // Mount all book routes under /books

// 404 handler — catches any unmatched route
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// Global error handler (must be last)
app.use(errorHandler);

// ── Start Server ───────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log("\n Book Library API  →  http://localhost:" + PORT);
  console.log("   Press Ctrl+C to stop.\n");
});

module.exports = app; // exported for testing (Jest / Supertest)