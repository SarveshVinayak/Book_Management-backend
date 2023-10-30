import { STATUS_CODES, SUCCESS_MESSAGES } from "../../config/appConstants.js";
import { bookService } from "../../services/index.js";
import { successResponse } from "../../utils/response.js";
import { catchAsync } from "../../utils/universalFunction.js";

export const getBooks = catchAsync(async (req, res) => {
  const books = await bookService.getBooks(
    req.token.user._id,
    req.query.page,
    req.query.limit
  );
  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.SUCCESS,
    books
  );
});

export const addBook = catchAsync(async (req, res) => {
  const { title, author, summary } = req.body;
  const book = await bookService.addBook(
    req.token.user._id,
    title,
    author,
    summary
  );
  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.SUCCESS,
    book
  );
});

export const updateBook = catchAsync(async (req, res) => {
  const { title, author, summary, bookId } = req.body;
  const book = await bookService.updateBook(
    req.token.user._id,
    title,
    author,
    summary,
    bookId
  );
  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.SUCCESS,
    book
  );
});

export const deleteBook = catchAsync(async (req, res) => {
  await bookService.deleteBook(req.token.user._id, req.query.id);
  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.SUCCESS
  );
});

export const bookDetails = catchAsync(async (req, res) => {
  const book = await bookService.bookDetails(req.token.user._id, req.query.id);
  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.SUCCESS,
    book
  );
});
