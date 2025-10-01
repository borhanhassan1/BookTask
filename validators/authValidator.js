const { body } = require("express-validator");

const sendOtpValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email format")
    .bail(),
];

const registerValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isLength({ min: 5, max: 20 })
    .withMessage("Name must be between 5 and 20 characters")
    .bail(),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email format")
    .bail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8, max: 64 })
    .withMessage("Password must be between 8 and 64 characters")
    .bail()
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .bail()
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .bail()
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .bail(),
  body("age")
    .notEmpty()
    .withMessage("Age is required")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Age must be a positive number")
    .bail(),
  body("otp").notEmpty().withMessage("OTP is required").bail(),
];

const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email format")
    .bail(),
  body("password").notEmpty().withMessage("Password is required").bail(),
];

module.exports = {
  sendOtpValidator,
  registerValidator,
  loginValidator,
};
