const { is } = require("express/lib/request");
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book title is required"],
    minlength: [3, "Title must be at least 3 characters"],
    maxlength: [100, "Title must be at most 100 characters"],
    trim: true,
  },
  description: {
    type: String,
    minlength: [10, "Description must be at least 10 characters"],
    required: [true, "Book description is required"],
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Book creator is required"],
  },
  amount: {
    type: Number,
    required: [true, "Book amount is required"],
    min: [1, "Amount must be at least 1"],
  },
  isbn: {
    type: String,
    required: [true, "ISBN is required"],
    unique: [true, "ISBN must be unique"],
  },
});

module.exports = mongoose.model("Book", bookSchema);
