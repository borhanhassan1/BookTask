const Book = require("../models/Book");
const User = require("../models/User");
const mongoose = require("mongoose");

exports.createBook = async (data) => {
  return await Book.create(data);
};

exports.getAllBooks = async () => {
  return await Book.find().populate("createdBy", "name");
};

exports.getBookById = async (id) => {
  return await Book.findById(id).populate("createdBy", "name email");
};

exports.updateBook = async (id, userId, updateData, isAdmin) => {
  const book = await Book.findById(id);
  if (!book) throw new Error("Book not found");

  if (!isAdmin && book.createdBy.toString() !== userId) {
    throw new Error("Not authorized to update this book");
  }

  Object.assign(book, updateData);
  return await book.save();
};

exports.deleteBook = async (id, userId, isAdmin) => {
  const book = await Book.findById(id);
  if (!book) throw new Error("Book not found");

  if (!isAdmin && book.createdBy.toString() !== userId) {
    throw new Error("Not authorized to delete this book");
  }

  await book.deleteOne();
  return { message: "Book deleted successfully" };
};

exports.buyBook = async (bookId, userId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const book = await Book.findById(bookId).session(session);
    if (!book) throw new Error("Book not found");
    if (book.amount <= 0) throw new Error("Book is out of stock");

    book.amount -= 1;
    await book.save({ session });
    const user = await User.findById(userId).session(session);
    if (!user) throw new Error("User not found");

    user.book_bought_amount += 1;
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    return { book, user };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
