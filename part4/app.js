const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const { Blog } = require("./models/blog");
const blogsRouter = require("./controllers/blog");

const password = process.env.PASSWORD;

const mongoUrl = `mongodb+srv://admin:${password}@cluster0.h9qmslj.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .then(() => console.log("conected to MongoDB"));

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);

module.exports = app;
