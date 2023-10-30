import passport from "passport";
import { ERROR_MESSAGES, STATUS_CODES } from "../config/appConstants.js";
import { AuthFailedError } from "../utils/errors.js";

const verifyCallback =
  (req, resolve, reject, role) => async (err, token, info) => {
    if (err || info || !token) {
      return reject(new AuthFailedError());
    }

    if (role && token.role != role) {
      return reject(
        new AuthFailedError(
          ERROR_MESSAGES.UNAUTHORIZED,
          STATUS_CODES.AUTH_FAILED
        )
      );
    }

    if (token.role && !token[token.role]) {
      return reject(new AuthFailedError());
    } else {
      if (!token.isVerified) {
        return reject(
          new AuthFailedError(
            ERROR_MESSAGES.ACCOUNT_NOT_VERIFIED,
            STATUS_CODES.AUTH_FAILED
          )
        );
      }
      if (token.isDeleted) {
        return reject(new AuthFailedError());
      }
      if (token.user) {
        if (token.user.isDeleted) {
          return reject(
            new AuthFailedError(
              ERROR_MESSAGES.USER_NOT_FOUND,
              STATUS_CODES.AUTH_FAILED
            )
          );
        }
        if (!token.user.isVerified) {
          return reject(
            new AuthFailedError(
              ERROR_MESSAGES.ACCOUNT_NOT_VERIFIED,
              STATUS_CODES.AUTH_FAILED
            )
          );
        }
      }
    }

    req.token = token;
    return resolve();
  };

const auth = (role) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      verifyCallback(req, resolve, reject, role)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

export default auth;
