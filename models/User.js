const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [5, "Name must be at least 5 characters"],
    maxlength: [20, "Name must be at most 20 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
    lowercase: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    select: false,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
    maxlength: [64, "Password must be at most 64 characters"],
    validate: {
      validator: (value) =>
        validator.isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
        }),
      message:
        "Password must be strong (include uppercase, lowercase, and numbers) and at least 8 characters long",
    },
  },
  age: {
    type: Number,
    min: [0, "Age must be a positive number"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  book_bought_amount: {
    type: Number,
    default: 0,
    min: [0, "Book bought amount cannot be negative"],
  },
});

userSchema.virtual("booksCreated", {
  ref: "Book",
  localField: "_id",
  foreignField: "createdBy",
});

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
