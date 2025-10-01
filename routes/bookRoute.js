const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const authMiddleware = require("../middlewares/authMiddleware");
const validateRequest = require("../middlewares/validateRequest");
const {
  createBookValidator,
  updateBookValidator,
  bookIdValidator,
} = require("../validators/bookValidator");

router.use(authMiddleware);

router.post(
  "/",
  createBookValidator,
  validateRequest,
  bookController.createBook
);

router.get("/", bookController.getBooks);

router.get("/:id", bookIdValidator, validateRequest, bookController.getBook);

router.put(
  "/:id",
  updateBookValidator,
  validateRequest,
  bookController.updateBook
);

router.delete(
  "/:id",
  bookIdValidator,
  validateRequest,
  bookController.deleteBook
);

router.post(
  "/buy/:id",
  bookIdValidator,
  validateRequest,
  bookController.buyBook
);

module.exports = router;
