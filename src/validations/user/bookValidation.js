import Joi from "joi";
import { JOI } from "../../config/appConstants.js";

export const getBooks = {
  query: Joi.object().keys({
    page: JOI.PAGE,
    limit: JOI.LIMIT,
  }),
};

export const addBook = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    author: Joi.string().required(),
    summary: Joi.string().required(),
  }),
};

export const updateBook = {
  body: Joi.object().keys({
    bookId: JOI.OBJECTID,
    title: Joi.string().required(),
    author: Joi.string().required(),
    summary: Joi.string().required(),
  }),
};

export const deleteBook = {
  query: Joi.object().keys({
    id: JOI.OBJECTID,
  }),
};

export const bookDetails = {
  query: Joi.object().keys({
    id: JOI.OBJECTID,
  })
}