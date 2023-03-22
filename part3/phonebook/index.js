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

app.get("/api/persons", (request, response) => {
  Person.find({})
    .then((persons) => response.json(persons))
    .then(() => mongoose.connection.close());
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = list.find((person) => person.id === Number(id));
  person ? response.json(person) : response.status(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  list = list.filter((person) => person.id !== Number(id));

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("conectado");
    });
  const newPerson = createNewPerson(request.body.name, request.body.number);
  if (!request.body.name) response.status(400).send("Error: Name missing");
  else if (!request.body.number)
    response.status(400).send("Error: Number missing");
  else {
    newPerson
      .save()
      .then((result) => {
        console.log(newPerson.name + " saved");
        mongoose.connection.close();
      })
      .catch((err) => {
        console.log(err);
        mongoose.connection.close();
      });
  }
});

app.put("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = list.find((person) => Number(person.id) === id);
  if (person) {
    person = req.body;
    console.log(person);
    response.status(200).send(req.body);
  } else response.status(404).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
