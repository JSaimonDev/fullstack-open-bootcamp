import { useState } from "react";

const Contacts = ({ persons }) => {
  return (
    <div>
      {console.log("Contacts")}
      {persons.map((persons) => (
        <p>
          {persons.name} {persons.tel}
        </p>
      ))}
    </div>
  );
};

const FileteredContacts = ({ persons, newSearch }) => {
  const filteredPersons = persons.filter((persons) =>
    persons.name.toLowerCase().includes(newSearch.toLowerCase())
  );
  return (
    <div>
      {console.log("FilteredContacts")}
      {console.log(newSearch)}
      {console.log(filteredPersons)}
      {console.log(persons)}
      {filteredPersons.map((persons) => (
        <p>
          {persons.name} {persons.tel}
        </p>
      ))}
    </div>
  );
};

const Search = ({ handleSearch }) => {
  return (
    <div>
      Search <input onChange={handleSearch}></input>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", tel: "950358234" },
  ]);
  const [newName, setNewName] = useState("");
  const [newTel, setTel] = useState("");
  const [newSearch, setSearch] = useState("");

  const addContact = (event) => {
    if (persons.some((persons) => persons.name === newName)) {
      window.alert(newName + " is already used");
      event.preventDefault();
    } else {
      const newObject = {
        name: newName,
        tel: newTel,
      };
      event.preventDefault();
      setPersons(persons.concat([newObject]));
      setNewName("");
      setTel("");
    }
  };

  const handleInput = (event) => {
    setNewName(event.target.value);
  };

  const handleTel = (event) => {
    setTel(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleSearch={handleSearch} />
      <form onSubmit={addContact}>
        <div>
          name: <input onChange={handleInput} value={newName} />
        </div>
        <div>
          tel: <input onChange={handleTel} value={newTel}></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {newSearch === "" ? (
        <Contacts persons={persons} />
      ) : (
        <FileteredContacts persons={persons} newSearch={newSearch} />
      )}
    </div>
  );
};

export default App;
