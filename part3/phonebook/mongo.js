require("dotenv").config();
const mongoose = require("mongoose");
const password = process.env.PASSWORD;
const url = `mongodb+srv://Disco:${password}@cluster0.v10nqzr.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("conectado");
  })
  .catch((err) => {
    console.log(err);
  });
