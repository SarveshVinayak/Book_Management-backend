import Joi from "joi";
import { JOI } from "../../config/appConstants.js";

export const signup = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: JOI.EMAIL,
    password: JOI.PASSWORD,
  }),
};

export const login = {
  body: Joi.object().keys({
    email: JOI.EMAIL,
    password: JOI.PASSWORD,
  }),
};
