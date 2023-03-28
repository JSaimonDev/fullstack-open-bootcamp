const mongoose = require("mongoose");
const { response } = require("express");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(express.static("build"));
require("./mongo.js");
const { Person, createNewPerson } = require("./models/Person.js");
const password = process.env.PASSWORD;
const url = `mongodb+srv://Disco:${password}@cluster0.v10nqzr.mongodb.net/?retryWrites=true&w=majority`;

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((persons) => response.json(persons))
    .catch((err) => next(err));
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = list.find((person) => person.id === Number(id));
  person ? response.json(person) : response.status(404).end();
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((err) => next(err));
});

app.post("/api/persons", (request, response, next) => {
  const newPerson = createNewPerson(request.body.name, request.body.number);
  if (!request.body.name) response.status(400).send("Error: Name missing");
  else if (!request.body.number)
    response.status(400).send("Error: Number missing");
  else {
    newPerson
      .save()
      .then((result) => {
        console.log(newPerson.name + " saved");
        response.status(201).json(newPerson);
      })
      .catch((err) => next(err));
  }
});

app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  const updatedPerson = {
    name: req.body.name,
    number: req.body.number,
  };
  Person.findByIdAndUpdate(id, updatedPerson, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => next(err));
});

app.use((error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError")
    response.status(400).send({ error: "wrong id" });
  else response.status(500).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
