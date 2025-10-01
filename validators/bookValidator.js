const { body, param } = require("express-validator");

const createBookValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .bail()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Amount must be a positive integer"),

  body("isbn")
    .notEmpty()
    .withMessage("ISBN is required"),
];

const updateBookValidator = [
  param("id").isMongoId().withMessage("Invalid book ID"),
  body("title")
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .optional()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),

  body("amount")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Amount must be a positive integer"),

];

const bookIdValidator = [
  param("id").isMongoId().withMessage("Invalid book ID"),
];

module.exports = {
  createBookValidator,
  updateBookValidator,
  bookIdValidator,
};
