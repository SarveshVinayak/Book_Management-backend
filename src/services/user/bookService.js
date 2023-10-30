import { ERROR_MESSAGES, STATUS_CODES } from "../../config/appConstants.js";
import { Books } from "../../models/index.js";
import { AuthFailedError } from "../../utils/errors.js";
import { paginationOptions } from "../../utils/universalFunction.js";

//list all books
export const getBooks = async (user, page, limit) => {
  const books = await Books.find(
    { user, isDeleted: false },
    { __v: 0 },
    paginationOptions(page, limit)
  );

  return books;
};

//add a new book
export const addBook = async (user, title, author, summary) => {
  const book = await Books.create({ user, title, author, summary });
  return book;
};

//update an existing book by its _id
export const updateBook = async (user, title, author, summary, _id) => {
  const book = await Books.findOneAndUpdate(
    { user, _id },
    { $set: { title, author, summary } },
    { new: 1, lean: 1 }
  );

  if (!book) {
    throw new AuthFailedError(
      ERROR_MESSAGES.BOOK_NOT_FOUND,
      STATUS_CODES.ACTION_FAILED
    );
  }

  return book;
};

//delete a book by _id
export const deleteBook = async (user, _id) => {
  const book = await Books.findOneAndUpdate(
    { user, _id },
    { $set: { isDeleted: true } },
    { new: 1, lean: 1 }
  );

  if (!book) {
    throw new AuthFailedError(
      ERROR_MESSAGES.BOOK_NOT_FOUND,
      STATUS_CODES.ACTION_FAILED
    );
  }
};

//get book details by _id
export const bookDetails = async (user, _id) => {
  const book = await Books.findOne({ _id, isDeleted: false }).lean();

  if (!book) {
    throw new AuthFailedError(
      ERROR_MESSAGES.BOOK_NOT_FOUND,
      STATUS_CODES.ACTION_FAILED
    );
  }

  return book;
};
