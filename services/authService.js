const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const cache = require("../config/cache");
const emailQueue = require("../queues/emailQueue");

exports.sendOtp = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }
    const otpCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const success = cache.set(`otp:${email}`, otpCode, 180);
    if (!success) {
      throw new Error("Failed to store OTP in cache");
    }
    emailQueue.push({
      to: email,
      subject: "Your OTP Code from BookStore",
      text: `Your OTP is: "${otpCode}" It will expire in 3 minutes`,
    });
    return {
      message: "OTP sent successfully, Kindly check your spam.",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.register = async ({ name, email, password, age, otp }) => {
  const storedOtp = cache.get(`otp:${email}`);
  if (!storedOtp) {
    throw new Error("OTP expired or not found");
  }
  if (storedOtp !== otp) {
    throw new Error("Invalid OTP");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    age,
  });

  cache.del(`otp:${email}`);

  const token = generateToken(newUser);

  return {
    message: "User registered successfully",
    token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      age: newUser.age,
      role: newUser.role,
    },
  };
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user);
  console.log("🔑 JWT Token:", token); 

  return {
    message: "Login successful",
    token,
  };
};
