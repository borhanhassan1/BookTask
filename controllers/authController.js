const authService = require("../services/authService");
const validator = require("validator");

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await authService.sendOtp(email);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, age, otp } = req.body;

    const result = await authService.register({
      name,
      email,
      password,
      age,
      otp,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login({ email, password });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
