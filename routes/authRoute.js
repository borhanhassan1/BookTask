const express = require("express");
const router = express.Router();
const validateRequest = require("../middlewares/validateRequest");
const { loginLimiter } = require("../utils/rateLimiter");

const {
  sendOtpValidator,
  registerValidator,
  loginValidator,
} = require("../validators/authValidator");

const { sendOtp, register, login } = require("../controllers/authController");

router.post("/send-otp", sendOtpValidator, validateRequest, sendOtp);

router.post("/register", registerValidator, validateRequest, register);

router.post("/login", loginLimiter, loginValidator, validateRequest, login);

module.exports = router;
