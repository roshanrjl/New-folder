import dotenv from "dotenv";
import app from "./app.js";
import connectDb from "./db/connect.js";
import { validateEnv } from "./utils/validateEnv.js";

dotenv.config({
  path: "./.env",
});

validateEnv();

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running at port:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("connection faild:", error);
  });
