import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./controllers/errorControl.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Database connection Field ");
  });
app.use('/api/auth', authRoutes)
app.use(globalErrorHandler)
const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
