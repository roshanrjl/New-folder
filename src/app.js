import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import userRoute from "./routes/user.routes.js";
// import morgan from "morgan"

const app = express();

app.use(
  cors({
    origin: process.env.CROS_ORIGIN,
    credentials: true,
  })
);

app.use(morgan("combined"));
//middlewaire start vayo and middlewaire garauda .use garne
//frontend bataaayako json data lai linw ko lagi ra limit is a option i.e 16kb samma data json format ma linw milxa yo aafi set garne ho {yo middlewaire ho}
app.use(express.json({ limit: "16kb" }));

//url ko through bata data aayo vane  recieve garnw ko lagi banayako middlewaire ho
//extended la garda object vitra pani object linw milxa
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// image , file ,folder huru lai store garnw
app.use(express.static("public"));

//user ko browser ma vayako cookeies lai access garnw ra crud operation garnw ko lagi
app.use(cookieParser());

//router import
app.use("/api/v1/users", userRoute);

//route declaration
app.get("/", (req, res) => {
  res.send("Hello, Morgan!");
});

export default app;
