// middleware/validate.js
// Input validation middleware for book routes.

const THIS_YEAR = new Date().getFullYear();

// Full validation for POST (all fields required)
const validateBook = (req, res, next) => {
  const { title, author, year, genre } = req.body;
  const errors = [];

  if (!title || typeof title !== "string" || !title.trim())
    errors.push("'title' is required and must be a non-empty string.");
  if (!author || typeof author !== "string" || !author.trim())
    errors.push("'author' is required and must be a non-empty string.");
  if (year === undefined || year === null) {
    errors.push("'year' is required.");
  } else if (isNaN(Number(year)) || Number(year) < 1 || Number(year) > THIS_YEAR) {
    errors.push(`'year' must be a valid year between 1 and ${THIS_YEAR}.`);
  }
  if (!genre || typeof genre !== "string" || !genre.trim())
    errors.push("'genre' is required and must be a non-empty string.");

  if (errors.length) return res.status(400).json({ success: false, errors });
  next();
};

// Partial validation for PUT (at least one valid field required)
const validatePartialBook = (req, res, next) => {
  const allowed  = ["title", "author", "year", "genre"];
  const provided = Object.keys(req.body).filter((k) => allowed.includes(k));

  if (!provided.length)
    return res.status(400).json({
      success: false,
      errors: [`Provide at least one of: ${allowed.join(", ")}.`],
    });

  if (req.body.year !== undefined) {
    const y = Number(req.body.year);
    if (isNaN(y) || y < 1 || y > THIS_YEAR)
      return res.status(400).json({
        success: false,
        errors: [`'year' must be a valid year between 1 and ${THIS_YEAR}.`],
      });
  }
  next();
};

module.exports = { validateBook, validatePartialBook };