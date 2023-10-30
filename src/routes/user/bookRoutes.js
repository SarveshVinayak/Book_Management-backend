import express from "express";
import { bookController } from "../../controllers/index.js";
import auth from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import { bookValidation } from "../../validations/index.js";
import { ROLE } from "../../config/appConstants.js";

const router = express.Router();

router.get(
  "/list",
  auth(ROLE.USER),
  validate(bookValidation.getBooks),
  bookController.getBooks
);

router.post(
  "/create",
  auth(ROLE.USER),
  validate(bookValidation.addBook),
  bookController.addBook
);

router.put(
  "/update",
  auth(ROLE.ADMIN),
  validate(bookValidation.updateBook),
  bookController.updateBook
);

router.delete(
  "/delete",
  auth(ROLE.ADMIN),
  validate(bookValidation.deleteBook),
  bookController.deleteBook
);

router.get(
  "/detail",
  auth(ROLE.USER),
  validate(bookValidation.bookDetails),
  bookController.bookDetails
);

export default router;
