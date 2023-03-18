const { response } = require("express");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

app.use(express.json());
app.use(morgan());
app.use(cors());
app.use(express.static("build"));

let list = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

app.get("/api/persons", (request, response) => {
  response.json(list);
});

app.get("/info", (request, response) => {
  const length = "Phonebook has info for " + list.length + " people";
  const date = new Date();

  const message = `${length}\n${date.toLocaleString()}`;

  response.write(length + "\n");
  response.write(date.toLocaleString());
  response.end();
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
  const id = getRandomInt(1, 10000);
  const newPerson = request.body;
  newPerson.id = id;
  const nameExist = list.find((person) => person.name === newPerson.name);
  list = list.concat(newPerson);

  if (!newPerson.name) response.status(400).send("Error: Name missing");
  else if (!newPerson.number)
    response.status(400).send("Error: Number missing");
  else if (nameExist)
    response.status(409).send(`Name ${newPerson.name} already exist`);
  else response.status(200).send(newPerson);
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
