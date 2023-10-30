import jwt from "jsonwebtoken";
import moment from "moment";
import { ObjectId as ObjectID } from "mongodb";
import {
  ERROR_MESSAGES,
  STATUS_CODES,
  TOKEN_TYPE,
} from "../config/appConstants.js";
import config from "../config/config.js";
import { Token } from "../models/index.js";
import { AuthFailedError } from "../utils/errors.js";

export const generateToken = (data, secret = config.jwt.secret) => {
  const payload = {
    user: data.user,
    exp: data.tokenExpires.unix(),
    type: data.tokenType,
    id: data.tokenId,
    role: data.userType,
  };
  return jwt.sign(payload, secret);
};

export const saveToken = async (data) => {
  let dataToBesaved = {
    expires: data.tokenExpires.toDate(),
    type: data.tokenType,
    _id: data.tokenId,
    device: { token: data.deviceToken },
    role: data.userType,
    token: data.token,
    otp: data.otp,
  };
  if (data.userType) {
    dataToBesaved[data.userType] = data.user._id;
    dataToBesaved.isVerified = true;
  }
  const tokenDoc = await Token.create(dataToBesaved);
  return tokenDoc;
};

export const generateAuthToken = async (user, userType, deviceToken) => {
  const tokenExpires = moment().add(config.jwt.accessExpirationMinutes, "days");
  var tokenId = new ObjectID();
  const accessToken = generateToken({
    tokenExpires,
    tokenType: TOKEN_TYPE.ACCESS,
    userType,
    tokenId,
  });
  await saveToken({
    token: accessToken,
    tokenExpires,
    tokenId,
    deviceToken,
    tokenType: TOKEN_TYPE.ACCESS,
    userType,
    user,
  });
  return {
    token: accessToken,
    expires: tokenExpires.toDate(),
  };
};

export const refreshAuth = async (user, tokenId, userType, device) => {
  await Token.findByIdAndUpdate(tokenId, { isDeleted: true });
  return generateAuthToken(user, userType, device.token);
};

export const logout = async (tokenId) => {
  const token = await Token.findOne({ _id: tokenId, isDeleted: false });
  if (!token) {
    throw new AuthFailedError(
      ERROR_MESSAGES.AUTHENTICATION_FAILED,
      STATUS_CODES.ACTION_FAILED
    );
  }
  const updatedToken = await Token.findByIdAndUpdate(tokenId, {
    isDeleted: true,
  });
  return updatedToken;
};
