import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

const validate = (req, _res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  throw new ApiError(422, "Received invalid data", extractedErrors);
};

export { validate };
