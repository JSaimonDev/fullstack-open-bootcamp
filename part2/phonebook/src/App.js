import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Contacts = ({ persons }) => {
  return (
    <div>
      {persons.map((persons) => (
        <p>
          {persons.name} {persons.number}
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
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newTel, setTel] = useState("");
  const [newSearch, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

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
