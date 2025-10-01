const bookService = require("../services/bookService");

exports.createBook = async (req, res) => {
  try {
    const book = await bookService.createBook({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json({ Message: "Book created successfully", book });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const updated = await bookService.updateBook(
      req.params.id,
      req.user.id,
      req.body,
      req.user.role === "admin"
    );
    res.json(updated);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const result = await bookService.deleteBook(
      req.params.id,
      req.user.id,
      req.user.role === "admin"
    );
    res.json(result);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

exports.buyBook = async (req, res) => {
  try {
    const result = await bookService.buyBook(req.params.id, req.user.id);
    res.status(200).json({ message: "Book purchased successfully" });
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};
