const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

listSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("person", listSchema);

const createNewPerson = (name, number) =>
  new Person({
    name: name,
    number: number,
  });

module.exports = { Person, createNewPerson };
