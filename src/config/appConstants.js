import Joi from "joi";
import { objectId } from "../validations/custom.validation.js";

export const TOKEN_TYPE = {
  ACCESS: "access",
  REFRESH: "refresh",
  RESET_PASSWORD: "resetPassword",
};

export const ROLE = {
  USER: "user",
};

const JOI = {
  EMAIL: Joi.string().email().lowercase().trim().required(),
  PASSWORD: Joi.string().min(6).required(),
  PHONENUMBER: Joi.string()
    .max(10)
    .min(10)
    .message("Please enter a valid phone number"),
  LIMIT: Joi.number().default(50),
  PAGE: Joi.number().default(0),
  SEARCH: Joi.string().allow("").replace("(", "\\(").replace(")", "\\)"),
  OBJECTID: Joi.string().custom(objectId).required(),
  DEVICE_TYPE: Joi.string()
    .valid(...Object.values(DEVICE_TYPE))
    .required(),
  ROLE: Joi.string()
    .valid(...Object.values(USER_TYPE))
    .required(),
  BOOLEAN: Joi.boolean().required(),
};

const SUCCESS_MESSAGES = {
  SUCCESS: "Success",
  LOGOUT: "User successfully logged out",
  MAIL_SENT: "Mail sent successfully",
};

const ERROR_MESSAGES = {
  NOT_FOUND: "Not found",
  VALIDATION_FAILED: "Validation Failed, Kindly check your parameters",
  SERVER_ERROR: "Something went wrong, Please try again.",
  AUTHENTICATION_FAILED: "Please authenticate",
  UNAUTHORIZED: "You are not authorized to perform this action",
  EMAIL_ALREADY_EXIST: "This email already exist. Please try with other email",
  EMAIL_NOT_FOUND: "Email not found",
  ACCOUNT_NOT_EXIST: "Account does not exist",
  WRONG_PASSWORD: "Password is Incorrect",
  USER_NOT_FOUND: "User not found!",
  ACCOUNT_DELETED: "Your account has been deleted by Admin",
  ACCOUNT_BLOCKED: "Your account has been blocked by Admin",
  ACCOUNT_NOT_VERIFIED: "Please verify your account.",
  OTP_EXPIRED: "OTP has expired, please try again.",
  OTP_FAILED: "Incorrect OTP",
  OTP_ALREADY_VERIFIED: "Already verified, you can sign in!",
  TOKEN_NOT_FOUND: "Token not found!",
  BOOK_NOT_FOUND: "Book not found!",
};

const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  ACTION_PENDING: 202,
  ACTION_COMPLETE: 204,
  VALIDATION_FAILED: 400,
  ACTION_FAILED: 400,
  AUTH_FAILED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,
  ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

export { ERROR_MESSAGES, JOI, STATUS_CODES, SUCCESS_MESSAGES };
