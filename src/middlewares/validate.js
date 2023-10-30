import Joi from "joi";
import { ValidationError } from "../utils/errors.js";
import { pick } from "../utils/universalFunction.js";

const validate = (schema) => (req, res, next) => {
  try {
    const validSchema = pick(schema, ["params", "query", "body"]);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: "key" } })
      .validate(object);
    if (error) {
      let errorMessage = error.details
        .map((details) => details.message)
        .join(", ")
        .replace(/"/g, "");
      console.error(errorMessage);
      return next(new ValidationError(errorMessage));
    }
    Object.assign(req, value);
    return next();
  } catch (err) {
    return res.send(err);
  }
};

export { validate };
