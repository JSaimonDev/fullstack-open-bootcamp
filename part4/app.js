const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

const password = process.env.PASSWORD;

const mongoUrl = `mongodb+srv://admin:${password}@cluster0.h9qmslj.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .then(() => console.log("conected to MongoDB"));

app.use(cors());
app.use(express.json());

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = app;
