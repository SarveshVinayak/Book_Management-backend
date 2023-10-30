import express from "express";
import { userAuthController } from "../../controllers/index.js";
import auth from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import { userAuthValidation } from "../../validations/index.js";
import { ROLE } from "../../config/appConstants.js";

const router = express.Router();

router.post(
  "/signup",
  validate(userAuthValidation.signup),
  userAuthController.signup
);

router.post(
  "/login",
  validate(userAuthValidation.login),
  userAuthController.login
);

router.post("/logout", auth(ROLE.USER), userAuthController.logout);

export default router;
