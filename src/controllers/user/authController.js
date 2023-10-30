import {
  STATUS_CODES,
  SUCCESS_MESSAGES,
  ROLE,
} from "../../config/appConstants.js";
import { tokenService, userAuthService } from "../../services/index.js";
import { formatUser } from "../../utils/formatResponse.js";
import { successResponse } from "../../utils/response.js";
import { catchAsync } from "../../utils/universalFunction.js";

export const signup = catchAsync(async (req, res) => {
  let { email, password, name } = req.body;
  const user = await userAuthService.signup(email, password, name);
  formatUser(user);
  const token = await tokenService.generateAuthToken(user, ROLE.USER);
  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.SUCCESS,
    { token, user }
  );
});

export const login = catchAsync(async (req, res) => {
  let { email, password } = req.body;

  const user = await userAuthService.login(email, password);
  formatUser(user);
  const token = await tokenService.generateAuthToken(user, ROLE.USER);
  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.SUCCESS,
    { token, user }
  );
});

export const logout = catchAsync(async (req, res) => {
  await tokenService.logout(req.token._id);
  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.LOGOUT
  );
});
