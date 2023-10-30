import bcrypt from "bcryptjs";
import { ERROR_MESSAGES, STATUS_CODES } from "../../config/appConstants.js";
import { Users } from "../../models/index.js";
import { AuthFailedError } from "../../utils/errors.js";

export const signup = async (email, password, name) => {
  if (await Users.findOne({ email, isDeleted: false })) {
    throw new AuthFailedError(
      ERROR_MESSAGES.EMAIL_ALREADY_EXIST,
      STATUS_CODES.ACTION_FAILED
    );
  }

  password = await bcrypt.hash(password, 8);

  const user = await Users.create({
    name,
    email,
    password,
  });

  return user.toObject();
};

export const login = async (email, password) => {
  const user = await Users.findOne({ email, isDeleted: false }).lean();

  if (!user) {
    throw new AuthFailedError(
      ERROR_MESSAGES.EMAIL_NOT_FOUND,
      STATUS_CODES.ACTION_FAILED
    );
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new AuthFailedError(
      ERROR_MESSAGES.WRONG_PASSWORD,
      STATUS_CODES.ACTION_FAILED
    );
  }

  return user;
};
