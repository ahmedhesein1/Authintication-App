import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Database connection Field ");
  });

const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
