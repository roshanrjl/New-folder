
import { ApiError } from "./ApiError.js";

const requiredEnvVars = [
  "PORT",
  "MONGODB_URI",
  "CORS_ORIGIN",
  "ACCESS_TOKEN_SECRET",
  "ACCESS_TOKEN_EXPIRY",
  "REFRESH_TOKEN_SECRET",
  "REFRESH_TOKEN_EXPIRY",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

const validateEnv = () => {
  const unsetEnvVars = requiredEnvVars.filter(
    (envVar) => !(envVar in process.env)
  );

  if (unsetEnvVars.length > 0) {
    throw new ApiError(
      500,
      `The following environment variables are not set: ${unsetEnvVars.join(
        ", "
      )}`
    );
  }
};

export { validateEnv };
