import "express-async-errors";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors());
// Connecting to mongodb
mongoose
  .connect(process.env.mongo_connect!, {})
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((e: any) => {
    console.log("Connection failed!");
    console.log(e);
  });

// Intiializing all models..
import "./models";
import usersRoute from "./modules/users/users.routes";
import errorHandler from "./handlers/errorHandler";

// All requests that is sent to localhost:8000/users will be forwarded to usersRoute now.
app.use("/users", usersRoute);

// Error handling...
app.use(errorHandler);

// Starting server
app.listen(8000, () => {
  console.log("Server started successfully!");
});
